import { type RouteRecordRaw, type Router } from 'vue-router';


export const addChildrenRoute = (router: Router, parentPath: string, route: RouteRecordRaw) => {
    const parentRoute = router.getRoutes().find((item) => item.path === parentPath)
    if(parentRoute) {
        const insertIndex = parentRoute.children.length > 0 ? parentRoute.children.length - 1 : parentRoute.children.length;
        parentRoute.children.splice(insertIndex, 0, route)
        // addRoute(parentName, route): () => void  第一个参赛parentName route 应该被加入到的父级路由记录
        router.addRoute(parentRoute?.name ?? 'Layout', route);
    }
}