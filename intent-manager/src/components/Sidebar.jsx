import { NavLink } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftEllipsisIcon, TagIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

function Sidebar() {
    return (
        <div className="drawer-side">
            <label htmlFor="sidebar-toggle" className="drawer-overlay w-screen"></label>
            <div className="p-0 w-64 min-h-full bg-base-100 text-base-content flex flex-col justify-between">
                <ul className="menu gap-2">
                    <div className='w-full h-16 flex justify-center items-center gap-2'>
                        <ChatBubbleLeftRightIcon className='w-6 h-6' />
                        <h1 className='font-bold text-lg'>Intent manager</h1>
                    </div>
                    <li>
                        <NavLink to="/intents" className={({ isActive }) => `h-12 flex justify-start items-center ${isActive ? 'bg-base-300' : ''}`}><ChatBubbleLeftEllipsisIcon className='w-6 h-6' />Intents</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Entities" className={`h-12 flex justify-start items-center pointer-events-none opacity-50`}><TagIcon className='w-6 h-6' />Entities</NavLink>
                    </li>
                </ul>
                <ul className="menu">
                    <li>
                        <NavLink to="/signin" className={`h-12 flex justify-start items-center pointer-events-none opacity-50`}><ArrowRightStartOnRectangleIcon className='w-6 h-6' />Sign In</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;