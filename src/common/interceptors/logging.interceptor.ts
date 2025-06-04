// import type { Interceptor, InterceptorContext, ResponseInterceptor } from 'elysia-nest';

// /**
//  * Interceptor that logs request and response data
//  */
// export class LoggingInterceptor implements Interceptor, ResponseInterceptor {
//     /**
//      * Log the incoming request
//      */
//     intercept(context: {
//         request: Request;
//         store: Record<string, any>;
//         set: {
//             status?: number;
//             headers?: Record<string, string>;
//             redirect?: string;
//         };
//     }) {
//         const { request } = context;
//         const startTime = Date.now();

//         console.log(`[${new Date().toISOString()}] Request - ${request.method} ${request.url}`);

//         // Store start time for response interceptor
//         context.store.requestStartTime = startTime;

//         // Continue with request handling
//         return;
//     }

//     /**
//      * Log the outgoing response
//      */
//     interceptAfter(context: InterceptorContext) {
//         const { request, store } = context;
//         const duration = Date.now() - (store.requestStartTime || Date.now());

//         console.log(`[${new Date().toISOString()}] Response - ${request.method} ${request.url} - ${context.set.status} - ${duration}ms`);

//         // Return the response unchanged
//         return context.response;
//     }
// }
