import React, { useState } from 'react';
import MinistrySidebar from './MinistrySidebar.tsx';
import { FaBell, FaSearch } from 'react-icons/fa';

const AddHospital: React.FC = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        hospitalBranch: '',
        hospitalType: '',
        contactNumber: '',
        hospitalEmail: ''
    });

    // Notification state
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/hospitals/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hospitalName: formData.hospitalName,
                    hospitalEmail: formData.hospitalEmail,
                    area: formData.hospitalBranch,
                    contactNumber: formData.contactNumber,
                    hospitalType: formData.hospitalType,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);

                // Show success notification
                setNotification({ message: 'Hospital added successfully!', type: 'success' });

                // Hide notification after 5 seconds
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            } else {
                // If response is not ok, throw error
                throw new Error('Failed to add hospital');
            }
        } catch (error) {
            console.error('Error:', error);

            // Show error notification
            setNotification({ message: 'Failed to add hospital. Please try again later.', type: 'error' });

            // Hide notification after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <MinistrySidebar />

            {/* Main content */}
            <main className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h2 className="text-3xl font-semibold">Add Hospital</h2>
                    </div>

                    <div className="header-right flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
                        />
                        <div className="absolute mt-0.7 ml-4 text-gray-500">
                            <FaSearch size="15px" />
                        </div>

                        <button className="notification-icon mr-4">
                            <FaBell size={18} />
                        </button>

                        <img className="profile-image" alt="Admin" />
                    </div>
                </header>

                {/* Notification */}
                {notification && (
                    <div
                        className={`fixed top-4 right-4 p-4 rounded shadow-lg transition-transform ${
                            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                    >
                        {notification.message}
                    </div>
                )}

                {/* Form */}
                <div className="form-container bg-white p-6 rounded-md shadow-md mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="form-group">
                                <label>Hospital Name</label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter Hospital Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Hospital Branch (Area)</label>
                                <input
                                    type="text"
                                    name="hospitalBranch"
                                    value={formData.hospitalBranch}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter Hospital Branch"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter Contact Number"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Hospital Email</label>
                                <input
                                    type="email"
                                    name="hospitalEmail"
                                    value={formData.hospitalEmail}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Hospital Type</label>
                                <select
                                    name="hospitalType"
                                    value={formData.hospitalType}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="PRIVATE_HOSPITAL">Private Hospital</option>
                                    <option value="PUBLIC_HOSPITAL">Public Hospital</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions mt-6 flex justify-end gap-4">
                            <button type="button" className="btn-cancel">
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddHospital;
