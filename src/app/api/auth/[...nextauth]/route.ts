import { handlers } from "@/lib/auth";

/**
 * @swagger
 * /api/auth/signin:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Sign in page
 *     description: Redirects to the sign-in page. This is handled by NextAuth.
 *     responses:
 *       302:
 *         description: Redirect to sign-in page
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in with credentials or OAuth
 *     description: |
 *       Authenticate user with email/password or OAuth providers (Google, GitHub).
 *       This endpoint is handled by NextAuth and supports multiple authentication methods.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 *
 * @swagger
 * /api/auth/signout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign out
 *     description: Sign out the current user and destroy the session
 *     responses:
 *       200:
 *         description: Sign out successful
 *
 * @swagger
 * /api/auth/session:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current session
 *     description: Returns the current user session if authenticated
 *     responses:
 *       200:
 *         description: Current session data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: clx1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     credits:
 *                       type: integer
 *                       example: 100
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["USER"]
 *                 expires:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-15T10:30:00.000Z"
 *       401:
 *         description: Not authenticated
 *
 * @swagger
 * /api/auth/providers:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get available auth providers
 *     description: Returns list of configured authentication providers (Google, GitHub, Credentials)
 *     responses:
 *       200:
 *         description: List of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 */
export const { GET, POST } = handlers;
