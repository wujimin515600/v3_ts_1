import { type ComponentInternalInstance, getCurrentInstance } from "vue";  
export default function useGlobelProperties(){
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;   //🌟
    return appContext.config.globalProperties;    //🌟
}