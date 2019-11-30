// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_background : cc.Sprite,
        m_title : cc.Label,
        m_startBtn : cc.Button,
        m_signInBox : cc.Node,
        m_loadingLabel : cc.Label,
        m_loadTime : 2,
        m_backgroundLoadStartOpacity : 0,
        m_backgroundLoadStartScale: 2,
        m_titleBeginV2 : cc.v2(0, 800),
        m_titleEndV2 : cc.v2(0, 240),
        m_StartButtonBeginV2 : cc.v2(0, -740),
        m_StartButtonEndV2 : cc.v2(0, -250),
        m_SignInBoxBeginV2 : cc.v2(0, -860),
        m_SignInBoxEndV2 : cc.v2(0, -250),
        m_loadingLabelBeginV2 : cc.v2(0, 800),
        m_loadingLabelEndV2 : cc.v2(0, 0)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
         //预加载界面
         cc.director.preloadScene("CreatePlayer", function () {
            cc.log("Next scene preloaded");
        });
        //主界面渐显与缩放
        this.m_background.node.opacity = this.m_backgroundLoadStartOpacity;
        this.m_background.node.scale = this.m_backgroundLoadStartScale;
        var fadeInAct = cc.fadeIn(this.m_loadTime);
        var scale2Act = cc.scaleTo(this.m_loadTime,1);
        this.m_background.node.runAction(fadeInAct); 
        var loadSequence = cc.sequence(scale2Act
            , cc.callFunc(this.backgroundLoadFinished
                , this)); 
        this.m_background.node.runAction(loadSequence);  
        //设置loading
        this.m_loadingLabel.node.setPosition(this.m_loadingLabelBeginV2);
        //设置标题与start按钮
        this.m_title.node.setPosition(this.m_titleBeginV2);
        var move2Act = cc.moveTo(this.m_loadTime / 2, this.m_titleEndV2);
        this.m_title.node.runAction(move2Act);

        this.m_startBtn.node.setPosition(this.m_StartButtonBeginV2);
        var startBtnMove2Act = cc.moveTo(this.m_loadTime / 2, this.m_StartButtonEndV2);
        this.m_startBtn.node.runAction(startBtnMove2Act);
        //设置登录框
        this.m_signInBox.setPosition(this.m_SignInBoxBeginV2);
    },

    backgroundLoadFinished : function(){
        cc.log('in backgroundLoadFinished');
    },

    onStartButtonClicked : function(){
        cc.log('start btn clicked');
        var startBtnMove2Act = cc.moveTo(this.m_loadTime / 4, this.m_StartButtonBeginV2);
        this.m_startBtn.node.runAction(startBtnMove2Act);
        var signInBoxMove2Act = cc.moveTo(this.m_loadTime / 4, this.m_SignInBoxEndV2);
        this.m_signInBox.runAction(signInBoxMove2Act);
    },

    onSignInButtonClicked : function(){
        cc.log('sign in btn clicked');
        //移除所有控件添加loading
        var loadingLabelMove2Act = cc.moveTo(this.m_loadTime / 4, this.m_loadingLabelEndV2);
        this.m_loadingLabel.node.runAction(loadingLabelMove2Act);

        var signInBoxMove2Act = cc.moveTo(this.m_loadTime / 4, this.m_SignInBoxBeginV2);
        this.m_signInBox.runAction(signInBoxMove2Act);

        var titleMove2Act = cc.moveTo(this.m_loadTime / 2, this.m_titleBeginV2);
        this.m_title.node.runAction(titleMove2Act);
        //checkpassword
        //load user info
        //检查是否有角色
        if (1) {
            //转场
            Global.USER_NAME = 'aaa';
            cc.log(Global.USER_NAME);
            cc.director.loadScene("CreatePlayer");
        }
    },

    start () {
    },

    // update (dt) {},
});
