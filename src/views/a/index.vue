<template>
    <div>
        <h1>Welcome to the A component!</h1>
        <!-- Add your content here -->
    </div>
</template>

<script>
export default {
    name: 'A',
    // 填充 data
    data() {
        return {
            articleList: [
                { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
                { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
                { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
                { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
                { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
                { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
                { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
                { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
                { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
            ]
        }
    }
    // 

    // Add your component logic here
}
</script>

<style scoped>
/* Add your component styles here */
</style>
