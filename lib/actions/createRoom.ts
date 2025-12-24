// An RLS policy must never SELECT from the same table it protects.
"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function createRoom(): Promise<{ roomId: string; success?: boolean, message?: string }> {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } =
        await supabase.auth.getUser();

    if (!user || authError) {
        throw new Error("Unauthorized");
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: room, error: roomError } =
        await supabaseAdmin
            .from("rooms")
            .insert({ host_id: user.id })
            .select()
            .single();

    if (roomError) {
        if (roomError.code == "23505") {
            return { roomId: "", success: false, message: "You already have an active room." };
        }
        throw roomError;
    }

    const { error: participantError } =
        await supabaseAdmin
            .from("room_participants")
            .insert({
                room_id: room.id,
                user_id: user.id,
                role: "host",
                presence: "absent",
            });

    if (participantError) throw participantError;
    revalidatePath("/app")

    return { roomId: room.id, success: true, message: "Room created successfully" };
}


export async function getActiveRooms(): Promise<{ success: boolean; data?: any[]; message?: string }> {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabaseAdmin
        .from('rooms')
        .select(`
      id,
      created_at,
      state,
      host:host_id (
        id,
        full_name,
        avatar_url
      ),
      participants:room_participants (
        user:profiles (
          id,
          avatar_url
        )
      )
    `)
    if (error) {
        console.log(error)
        return { success: false, message: error.message };
    }
    return { success: true, data: data, message: "Rooms fetched successfully" };
}