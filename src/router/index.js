import { createRouter, createWebHistory } from "vue-router";
import TestPage from "../pages/TimesheetPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: TestPage,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterPage,
        },
        {
            path: "/timesheet",
            name: "timesheet",
            component: TestPage,
        },
        // {
        //     path: "/product/:id",
        //     name: "product",
        //     component: ProductView,
        //     children: [
        //         {
        //             // complete path: /product/:id/comments
        //             path: "comments",
        //             component: ProductCommentsView,
        //         },
        //     ],
        // },
    ],
});

export default router;