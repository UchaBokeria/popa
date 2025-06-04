interface Package {
    id: number;
    ucPoints: number;
    amount: number;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    redirect?: string;
}

declare global {
    interface Window {
        initialData?: {
            packages: Package[];
        };
    }
}

export function cartData() {
    return {
        selectedPackage: null as Package | null,
        packages: [] as Package[],
        isProcessing: false,
        error: '',

        init() {
            // The packages data is passed from the server to Alpine.js
            // We're using an empty array as a fallback
            const win = window as any;
            this.packages = win.initialData?.packages || [];
        },

        selectPackage(pkg: Package) {
            this.selectedPackage = pkg;
            this.error = '';
        },

        isSelected(pkg: Package) {
            return this.selectedPackage && this.selectedPackage.id === pkg.id;
        },

        async submitPurchase() {
            if (!this.selectedPackage) {
                this.error = 'Please select a UC package';
                return;
            }

            this.isProcessing = true;

            try {
                const response = await fetch('/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ucPoints: this.selectedPackage.ucPoints,
                        amount: this.selectedPackage.amount,
                        userId: document.cookie
                            .split(';')
                            .find((c) => c.trim().startsWith('user='))
                            ?.split('=')[1],
                    }),
                });

                const data = (await response.json()) as ApiResponse;

                if (data.success) {
                    // Redirect to payment page
                    if (data.redirect) {
                        (window as any).location.href = data.redirect;
                    }
                } else {
                    this.error = data.message || 'Failed to create purchase';
                }
            } catch (error) {
                this.error = 'An error occurred. Please try again.';
                console.error('Purchase error:', error);
            } finally {
                this.isProcessing = false;
            }
        },
    };
}
