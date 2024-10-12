import React from 'react';
import MinistrySidebar from '../MinistrySidebar.tsx';


const AddDoctor: React.FC = () => {
    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <MinistrySidebar/>

            {/* Main content on the screen */}
            <main className="main-content">

                {/* First Part */}
                <header className="header">
                    {/* Header Left Side */}
                    <div className="header-left">
                        <div className="user-info">
                            <h2 className="text-3xl font-semibold">Add Doctor</h2>
                        </div>
                    </div>
                </header>

            </main>
        </div>
    )
}

export default AddDoctor