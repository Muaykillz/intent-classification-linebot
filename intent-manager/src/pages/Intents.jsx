import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ChatBubbleOvalLeftIcon, PlusIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

function Intents() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Layout>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl ml-4 font-bold">Intents</h1>
                    <button className="btn btn-neutral w-40 text-md flex items-center justify-center gap-2">
                        <PlusIcon className='w-6 h-6' />
                        Create Intent
                    </button>
                </div>
                <div className={`collapse collapse-arrow border-2 border-base-200 rounded-xl ${isOpen ? 'open' : ''}`}>
                    <input
                        type="checkbox"
                        checked={isOpen}
                        onChange={handleToggle}
                        className="hidden"
                    />
                    <div
                        className="collapse-title text-xl font-medium select-none"
                        onClick={handleToggle}
                    >
                        Intent name
                    </div>
                    {isOpen && (
                        <div className="collapse-content border-t-2 border-base-200 p-4 gap-4 flex flex-col">
                            <div className="p-4 rounded-md bg-base-100 flex flex-col gap-2 border-2 border-base-200">
                                <h2 className='font-semibold mb-2'>Training pharses</h2>
                                <label className="input input-bordered flex items-center gap-2">
                                    <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                                    <input type="text" className="grow" placeholder="Add user expression" />
                                </label>
                            </div>

                            <div className="p-4 rounded-md bg-base-100 flex flex-col gap-2 border-2 border-base-200">
                                <h2 className='font-semibold mb-2'>Response</h2>
                                <label className="input input-bordered flex items-center gap-2">
                                    <ArrowUturnLeftIcon className="w-6 h-6" />
                                    <input type="text" className="grow" placeholder="Add a response" />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}

export default Intents;
