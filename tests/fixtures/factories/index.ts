import { faker } from '@faker-js/faker'

/**
 * User Factory
 *
 * Factory for generating test user data
 */
export class UserFactory {
    /**
     * Create a user with random data
     */
    static create(overrides?: Partial<User>): User {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            phone: faker.phone.number(),
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.location.zipCode(),
                country: faker.location.country(),
            },
            ...overrides,
        }
    }

    /**
     * Create an admin user
     */
    static createAdmin(overrides?: Partial<User>): User {
        return this.create({
            email: `admin.${faker.string.alphanumeric(5)}@example.com`,
            ...overrides,
        })
    }

    /**
     * Create a regular user
     */
    static createRegular(overrides?: Partial<User>): User {
        return this.create({
            email: `user.${faker.string.alphanumeric(5)}@example.com`,
            ...overrides,
        })
    }

    /**
     * Create multiple users
     */
    static createMany(count: number, overrides?: Partial<User>): User[] {
        return Array.from({ length: count }, () => this.create(overrides))
    }
}

/**
 * User interface
 */
export interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    address: {
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
}

/**
 * Product Factory
 *
 * Factory for generating test product data
 */
export class ProductFactory {
    /**
     * Create a product with random data
     */
    static create(overrides?: Partial<Product>): Product {
        return {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            category: faker.commerce.department(),
            sku: faker.string.alphanumeric(10).toUpperCase(),
            inStock: faker.datatype.boolean(),
            quantity: faker.number.int({ min: 0, max: 100 }),
            ...overrides,
        }
    }

    /**
     * Create multiple products
     */
    static createMany(count: number, overrides?: Partial<Product>): Product[] {
        return Array.from({ length: count }, () => this.create(overrides))
    }
}

/**
 * Product interface
 */
export interface Product {
    name: string
    description: string
    price: number
    category: string
    sku: string
    inStock: boolean
    quantity: number
}

/**
 * Order Factory
 *
 * Factory for generating test order data
 */
export class OrderFactory {
    /**
     * Create an order with random data
     */
    static create(overrides?: Partial<Order>): Order {
        return {
            orderId: faker.string.uuid(),
            userId: faker.string.uuid(),
            products: ProductFactory.createMany(faker.number.int({ min: 1, max: 5 })),
            totalAmount: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
            status: faker.helpers.arrayElement([
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
            ]),
            createdAt: faker.date.past(),
            ...overrides,
        }
    }

    /**
     * Create multiple orders
     */
    static createMany(count: number, overrides?: Partial<Order>): Order[] {
        return Array.from({ length: count }, () => this.create(overrides))
    }
}

/**
 * Order interface
 */
export interface Order {
    orderId: string
    userId: string
    products: Product[]
    totalAmount: number
    status: string
    createdAt: Date
}
