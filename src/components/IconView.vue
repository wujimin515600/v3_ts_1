<template>
  <component :is="$antdIcons[ icon ]"></component>
</template>

<script setup lang='ts'>
import useGlobelProperties from '@/utils/useGlobelProperties'
defineProps({
    icon: {
        type: String,
        default: () => "BulbTwoTone"
    }
})
const { $antdIcons } = useGlobelProperties()
</script>


<style lang='scss' scoped>

</style>