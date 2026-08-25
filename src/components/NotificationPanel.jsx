import React from 'react';
import { Bell } from 'lucide-react';

function NotificationPanel({ notifications, onMarkAsRead }) {
    const unreadCount = notifications.filter(n => !n.read).length;
    const sortedNotifications = [...notifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="notification-panel">
            <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="badge" style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '0.15rem 0.45rem' }}>
                            {unreadCount} unread
                        </span>
                    )}
                </div>
                <Bell size={18} />
            </div>
            
            {sortedNotifications.length === 0 ? (
                <p className="empty-message">No new notifications.</p>
            ) : (
                <div className="notification-list">
                    {sortedNotifications.map(notification => (
                        <div 
                            key={notification.id} 
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                        >
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div className={`notification-icon type-${notification.type}`} />
                                <div className="notification-content">
                                    <p>{notification.message}</p>
                                    <span className="notification-time">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            {!notification.read && onMarkAsRead && (
                                <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#3b82f6',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Mark read
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotificationPanel;
