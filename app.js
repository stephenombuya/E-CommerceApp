const products = [
            {
                id: 1,
                title: "Smartphone",
                price: 499.99,
                image: "/api/placeholder/250/200"
            },
            {
                id: 2,
                title: "Laptop",
                price: 999.99,
                image: "/api/placeholder/250/200"
            },
            {
                id: 3,
                title: "Headphones",
                price: 99.99,
                image: "/api/placeholder/250/200"
            },
            {
                id: 4,
                title: "Smartwatch",
                price: 199.99,
                image: "/api/placeholder/250/200"
            }
        ];

        const cart = [];

        function renderProducts() {
            const productsContainer = document.querySelector('.products');
            productsContainer.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            updateCartUI();
        }

        function removeFromCart(productId) {
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCartUI();
            }
        }

        function updateCartUI() {
            const cartCount = document.querySelector('.cart-count');
            const cartItems = document.querySelector('.cart-items');
            const cartTotal = document.querySelector('.cart-total');

            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        ${item.title} x${item.quantity}
                    </div>
                    <div>
                        $${(item.price * item.quantity).toFixed(2)}
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }

        function toggleCart() {
            const cartModal = document.querySelector('.cart-modal');
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        }

        // Initial render
        renderProducts();
