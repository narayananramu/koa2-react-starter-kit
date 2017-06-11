export default class controller {
    async index(ctx, next){
        ctx.session.name = "Hi";
        await ctx.render('index',{layout: 'layout', name: ctx.params.name});
    }
}
