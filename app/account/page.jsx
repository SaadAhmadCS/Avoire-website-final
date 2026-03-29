
"use client"
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import {
     User,
     Package,
     MapPin,
     Settings,
     LogOut,
     ChevronRight,
     Bell,
     Heart,
     CreditCard,
     ChevronLeft
} from 'lucide-react';

const AccountPage = () => {
     const { data: session, update } = useSession();
     const [activeTab, setActiveTab] = useState('overview');
     const [editing, setEditing] = useState(false);
     const [formData, setFormData] = useState({});

     // always call hooks first
     React.useEffect(() => {
          if (!session?.user?.profile) return;

          const { profile } = session.user;

          setFormData({
               name: profile.name || '',
               phone: profile.phone || '',
               addresses: profile.addresses || []
          });
     }, [session]);

     // THEN conditional render
     if (!session) return <p className="p-8">Loading...</p>;

     const { profile } = session.user;
     const createdAt = profile?.createdAt ? new Date(profile.createdAt) : null;
     const handleChange = (e, index = null) => {
          const { name, value } = e.target;
          if (name === "addresses" && index !== null) {
               const updated = [...formData.addresses];
               updated[index] = value;
               setFormData({ ...formData, addresses: updated });
          } else {
               setFormData({ ...formData, [name]: value });
          }
     };

     const handleUpdate = async () => {
          try {
               const res = await fetch('/api/user/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    setEditing(false);
                    // Refresh session to reflect updated profile
                    update();
               }
          } catch (err) {
               console.error(err);
          }
     };

     const orders = [
          { id: '#AV-8921', date: 'Oct 12, 2024', status: 'Delivered', total: 240, items: 1 },
          { id: '#AV-7742', date: 'Aug 04, 2024', status: 'Delivered', total: 405, items: 2 }
     ];

     const SidebarItem = ({ icon: Icon, label, id }) => (
          <button
               onClick={() => setActiveTab(id)}
               className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${activeTab === id
                    ? 'bg-bg-card border border-border-default shadow-sm text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-subtle/50'
                    }`}
          >
               <div className="flex items-center space-x-4">
                    <Icon size={18} strokeWidth={activeTab === id ? 2 : 1.5} />
                    <span className="text-ui font-bold uppercase tracking-widest text-[10px]">{label}</span>
               </div>
               {activeTab === id && <div className="w-1 h-4 bg-accent rounded-full" />}
          </button>
     );

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent py-24">
              
               <main className="max-w-7xl mx-auto px-page-x py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                         {/* Left: Account Navigation */}
                         <div className="lg:col-span-3 space-y-8">
                              <div className="pb-8 border-b border-border-subtle">
                                   <h2 className="text-headline font-headline mb-1">{profile.name}</h2>
                                   <p className="text-[10px] font-bold uppercase tracking-widest text-text-disabled">
                                        Member since {createdAt?.getFullYear()}
                                   </p>
                              </div>

                              <nav className="space-y-2">
                                   <SidebarItem icon={User} label="Personal Profile" id="overview" />
                                   <SidebarItem icon={Package} label="Order History" id="orders" />
                                   <SidebarItem icon={MapPin} label="Addresses" id="addresses" />
                                   <SidebarItem icon={Heart} label="My Collection" id="wishlist" />
                                   <SidebarItem icon={CreditCard} label="Payment Methods" id="payment" />

                                   <div className="pt-8">
                                        <button
                                             onClick={() => signOut({callbackUrl:"/"})} className="w-full flex items-center space-x-4 px-6 py-4 text-text-muted hover:text-red-500 transition-colors">
                                             <LogOut size={18} strokeWidth={1.5} />
                                             <span className="text-ui font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
                                        </button>
                                   </div>
                              </nav>
                         </div>

                         {/* Right: Overview with edit/update */}
                         <div className="lg:col-span-9">
                              {activeTab === 'overview' && (
                                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <section>
                                             <div className="flex justify-between items-end mb-8">
                                                  <h3 className="text-headline font-headline uppercase tracking-widest text-lg">Personal Details</h3>
                                                  <button
                                                       onClick={() => setEditing(!editing)}
                                                       className="text-[10px] font-bold underline uppercase tracking-widest">
                                                       {editing ? 'Cancel' : 'Edit'}
                                                  </button>
                                             </div>

                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                  {/* Name */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Full Name</p>
                                                       {editing ? (
                                                            <input
                                                                 type="text"
                                                                 name="name"
                                                                 value={formData.name}
                                                                 onChange={handleChange}
                                                                 className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                            />
                                                       ) : <p className="text-ui font-medium">{profile.name}</p>}
                                                  </div>

                                                  {/* Phone */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Phone Number</p>
                                                       {editing ? (
                                                            <input
                                                                 type="text"
                                                                 name="phone"
                                                                 value={formData.phone}
                                                                 onChange={handleChange}
                                                                 className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                            />
                                                       ) : <p className="text-ui font-medium">{profile.phone || 'Not set'}</p>}
                                                  </div>

                                                  {/* Addresses */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Addresses</p>
                                                       {editing ? (
                                                            <div className="space-y-2">
                                                                 {formData.addresses.map((addr, i) => (
                                                                      <input
                                                                           key={i}
                                                                           type="text"
                                                                           name="addresses"
                                                                           value={addr}
                                                                           onChange={(e) => handleChange(e, i)}
                                                                           className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                                      />
                                                                 ))}
                                                                 <button
                                                                      onClick={() => setFormData({ ...formData, addresses: [...formData.addresses, ''] })}
                                                                      className="px-3 py-1 border border-border-strong rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-text-inverse transition-all mt-2">
                                                                      Add Address
                                                                 </button>
                                                            </div>
                                                       ) : (
                                                                 <ul className="list-disc ml-5 text-ui font-medium">
                                                                      {profile?.addresses?.map((addr, i) => (
                                                                           <li key={i}>{addr}</li>
                                                                      ))}
                                                                 </ul>
                                                       )}
                                                  </div>
                                             </div>

                                             {/* Save Button */}
                                             {editing && (
                                                  <div className="pt-6">
                                                       <button
                                                            onClick={handleUpdate}
                                                            className="px-6 py-3 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                                                            Save Changes
                                                       </button>
                                                  </div>
                                             )}
                                        </section>
                                   </div>
                              )}
                              {activeTab === 'addresses' && (
                                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <section>
                                             <h3 className="text-headline font-headline uppercase tracking-widest text-lg mb-6">
                                                  Saved Addresses
                                             </h3>

                                             {editing ? (
                                                  <div className="space-y-2">
                                                       {formData.addresses.map((addr, i) => (
                                                            <input
                                                                 key={i}
                                                                 type="text"
                                                                 name="addresses"
                                                                 value={addr}
                                                                 onChange={(e) => handleChange(e, i)}
                                                                 className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                            />
                                                       ))}
                                                       <button
                                                            onClick={() =>
                                                                 setFormData({ ...formData, addresses: [...formData.addresses, ''] })
                                                            }
                                                            className="px-3 py-1 border border-border-strong rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-text-inverse transition-all mt-2"
                                                       >
                                                            Add Address
                                                       </button>
                                                  </div>
                                             ) : (
                                                  <ul className="list-disc ml-5 text-ui font-medium">
                                                       {profile?.addresses?.map((addr, i) => (
                                                            <li key={i}>{addr}</li>
                                                       ))}
                                                  </ul>
                                             )}

                                             {editing && (
                                                  <div className="pt-6">
                                                       <button
                                                            onClick={handleUpdate}
                                                            className="px-6 py-3 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                                                       >
                                                            Save Changes
                                                       </button>
                                                  </div>
                                             )}
                                        </section>
                                   </div>
                              )}
                         </div>
                    </div>
               </main>
          </div>
     );
};

export default AccountPage;