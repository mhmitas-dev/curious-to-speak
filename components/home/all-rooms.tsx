import { getActiveRooms } from '@/lib/actions/createRoom'
import { SpeakingRoomCard } from './speaking-room-card'

const AllRooms = async () => {
    const { data: rooms, message } = await getActiveRooms()

    return (
        <div>
            <p>{message}</p>
            <div className='grid grid-cols-2 gap-8'>
                {rooms && rooms.length > 0 && rooms.map((room) => (
                    <SpeakingRoomCard
                        key={room.id}
                        room={room}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllRooms