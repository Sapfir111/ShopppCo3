export function saveToStorage(key, data) {
    localStorage.setItem(`${key}`, JSON.stringify(data));
}

export function loadFromStorage(key, arrayName) {
    const savedData = JSON.parse(localStorage.getItem(`${key}`));

    if (savedData && Array.isArray(savedData)) {
        arrayName.push(...savedData);
    } else {
        console.error('No valid data found in localStorage.');
    }
}

export const products = [
    {
        id: 'c50c3520-d1bc-4d44-963d-fcb9d0bcd9a6',
        generationId: '1',
        image: 'images/products/new-arrivals/1.svg',
        name: 'T-Shirt With Tape Details',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '4.5'
        },
        price: 12000,
        description: 'A stylish T-shirt featuring unique tape details, perfect for casual wear and modern street fashion.'
    },
    {
        id: '40750912-dd4a-46d0-bfdd-446dc8b57303',
        generationId: '1',
        image: 'images/products/new-arrivals/2.svg',
        name: 'Skinny Fit Jeans',
        rating: {
            starsImage: 'images/icons/stars/3.5.svg',
            starsQuantity: '3.5'
        },
        price: 24000,
        previousPrice: 26000,
        discount: 20,
        description: 'Slim-fitting jeans that provide a sleek silhouette, ideal for both casual and semi-formal occasions.'
    },
    {
        id: '627072c7-86da-428c-92b0-a918c966db51',
        generationId: '1',
        image: 'images/products/new-arrivals/3.svg',
        name: 'Checkered Shirt',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '4.5'
        },
        price: 12000,
        description: 'A timeless checkered shirt offering a classic design, perfect for both casual and smart-casual looks.'
    },
    {
        id: '04a3e75f-64dc-4989-9885-bd06a7d70418',
        generationId: '1',
        image: 'images/products/new-arrivals/4.svg',
        name: 'Sleeve Striped T-Shirt',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '4.5'
        },
        price: 13000,
        previousPrice: 26000,
        discount: 20,
        description: 'A trendy sleeve-striped T-shirt, combining comfort and style for a unique casual outfit.'
    },
    {
        id: '20f9e687-d22e-47b9-aefe-174bd5d79afe',
        generationId: '2',
        image: 'images/products/top-selling/1.svg',
        name: 'Vertical Striped Shirt',
        rating: {
            starsImage: 'images/icons/stars/5.svg',
            starsQuantity: '5.0'
        },
        price: 21200,
        previousPrice: 23200,
        discount: 20,
        description: 'A sharp vertical striped shirt that adds a modern twist to your wardrobe for smart-casual looks.'
    },
    {
        id: '2a93e572-ee5f-4c0a-85a0-89c96ae3145d',
        generationId: '2',
        image: 'images/products/top-selling/2.svg',
        name: 'Courage Graphic T-Shirt',
        rating: {
            starsImage: 'images/icons/stars/4.svg',
            starsQuantity: '4.0'
        },
        price: 14500,
        description: 'A bold graphic T-shirt with a courageous design, perfect for expressing personality and confidence.'
    },
    {
        id: '2b9a2407-cbbc-4c0c-96f9-822960b0ac84',
        generationId: '2',
        image: 'images/products/top-selling/3.svg',
        name: 'Loose Fit Bermuda Shorts',
        rating: {
            starsImage: 'images/icons/stars/3.svg',
            starsQuantity: '3.0'
        },
        price: 8000,
        description: 'Comfortable loose-fit Bermuda shorts for a relaxed, summer-ready look, perfect for outdoor activities.'
    },
    {
        id: 'dd5896a7-2b59-4135-b642-b3d36687594a',
        generationId: '2',
        image: 'images/products/top-selling/4.svg',
        name: 'Faded Skinny Jeans',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '4.5'
        },
        price: 21000,
        description: 'Stylish faded skinny jeans with a worn-in look, combining comfort and contemporary fashion effortlessly.'
    },
    {
        id: '90163065-fdb6-4e8c-a561-6a823cd8a4aa',
        generationId: '3',
        image: 'images/products/details/also-like/1.svg',
        name: 'Polo with Contrast Trims',
        rating: {
            starsImage: 'images/icons/stars/4.svg',
            starsQuantity: '4.0'
        },
        price: 21200,
        previousPrice: 26000,
        discount: 20,
        description: 'Classic polo shirt with contrast trims, ideal for a polished casual look with a sporty edge.'
    },
    {
        id: '367002e9-ebd2-40ff-a78d-10dd6e954cce',
        generationId: '3',
        image: 'images/products/details/also-like/2.svg',
        name: 'Gradient Graphic T-shirt',
        rating: {
            starsImage: 'images/icons/stars/3.5.svg',
            starsQuantity: '3.5'
        },
        price: 14500,
        description: 'A gradient graphic T-shirt, featuring a striking design that creates a bold visual statement.'
    },
    {
        id: 'b0329ebc-f5de-4fab-bd42-90619cf7ad5f',
        generationId: '3',
        image: 'images/products/new-arrivals/3.svg',
        name: 'Polo with Tipping Details',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '4.5'
        },
        price: 18000,
        description: 'Sleek polo shirt with tipping details for a refined and sporty touch to your casual wardrobe.'
    },
    {
        id: '3eafb575-6e3f-4b0c-9c5b-fe5b09aea20a',
        generationId: '3',
        image: 'images/products/new-arrivals/4.svg',
        name: 'Black Striped T-shirt',
        rating: {
            starsImage: 'images/icons/stars/4.5.svg',
            starsQuantity: '5.0'
        },
        price: 12000,
        previousPrice: 15000,
        discount: 30,
        description: 'Black striped T-shirt offering a stylish and versatile piece for casual, everyday wear.'
    }
]