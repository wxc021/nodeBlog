const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/get/users', async (ctx, next) => {
  console.log( ctx.request.query.user, ctx.request.query.projectId);
  ctx.json({
    user:'1111'
  })
  ctx.body = {
    title: '用户信息'
  }
})

module.exports = router
