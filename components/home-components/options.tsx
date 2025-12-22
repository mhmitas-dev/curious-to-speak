import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const Options = () => {

    return (
        <section className='custom-container'>
            <div>
                <Button>
                    <span>Create a new Room</span>
                    <Plus />
                </Button>
            </div>
        </section>
    )
}

export default Options