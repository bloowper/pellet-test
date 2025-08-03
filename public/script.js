// Global variables
let quoteModal = null;
let quoteForm = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Global script initialized');
    
    // Initialize modal
    initQuoteModal();
    
    // Make sure openQuoteModal is available globally
    if (typeof window.openQuoteModal !== 'function') {
        window.openQuoteModal = openQuoteModal;
    }
    
    // Make sure showNotification is available globally
    if (typeof window.showNotification !== 'function') {
        window.showNotification = showNotification;
    }
});

// Quote Modal Functions
function initQuoteModal() {
    quoteModal = document.getElementById('quote-modal');
    quoteForm = document.getElementById('quote-form');
    
    if (!quoteModal) {
        console.error('Quote modal not found');
        return;
    }
    
    // Close modal when clicking close button
    const closeButton = document.getElementById('close-quote-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking cancel button
    const cancelButton = document.getElementById('cancel-quote');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking outside
    quoteModal.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            closeQuoteModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quoteModal && !quoteModal.classList.contains('hidden')) {
            closeQuoteModal();
        }
    });
    
    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmission);
    }
}

function openQuoteModal() {
    if (!quoteModal) {
        quoteModal = document.getElementById('quote-modal');
    }
    
    if (quoteModal) {
        quoteModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = quoteModal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    } else {
        console.error('Quote modal not found');
    }
}

function closeQuoteModal() {
    if (!quoteModal) {
        quoteModal = document.getElementById('quote-modal');
    }
    
    if (quoteModal) {
        quoteModal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Reset form
        if (!quoteForm) {
            quoteForm = document.getElementById('quote-form');
        }
        if (quoteForm) {
            quoteForm.reset();
        }
    }
}

function handleQuoteSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const data = {
        name: document.getElementById('name')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        email: document.getElementById('email')?.value || '',
        quantity: document.getElementById('quantity')?.value || '',
        message: document.getElementById('message')?.value || ''
    };
    
    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.quantity) {
        showNotification('Proszę wypełnić wszystkie wymagane pola.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Proszę podać prawidłowy adres email.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Wysyłanie...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Zapytanie zostało wysłane! Skontaktujemy się z Państwem w ciągu 24 godzin.', 'success');
        closeQuoteModal();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 16px;
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        color: var(--color-text);
    `;
    
    // Set type-specific styles
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    }
    
    // Style notification content
    const notificationContent = notification.querySelector('.notification__content');
    if (notificationContent) {
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        `;
    }
    
    // Style close button
    const closeButton = notification.querySelector('.notification__close');
    if (closeButton) {
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}
