// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var g_backgroundMinX = 0;
var g_backgroundMaxX = 0;
var g_LVSliderBeginPos;
var g_LVSliderEndPos;

cc.Class({
    extends: cc.Component,

    properties: {
       m_playerJson : cc.JsonAsset,
       m_backgroundSprite : cc.Sprite,
       m_attackBtn : cc.Button,
       m_cardBtn : cc.Button,
       m_shopBtn : cc.Button,
       m_leftArrowSprite : cc.Sprite,
       m_rightArrowSprite : cc.Sprite,
       m_HeadPortraitSprite : cc.Sprite,
       m_LVSliderUnderSprite : cc.Sprite,
       m_LVSliderSprite : cc.Sprite,
       m_PlayerNameLabel : cc.Label,
       m_mainRect : cc.Rect,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
        this.m_attackBtn.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
        this.m_cardBtn.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
        this.m_shopBtn.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
        var backgroundSize = this.m_backgroundSprite.node.getContentSize();
        var canvasSize = this.node.getContentSize();
        g_backgroundMinX = 0 - backgroundSize.width / 2 + canvasSize.width / 2;
        g_backgroundMaxX = 0 + backgroundSize.width / 2 - canvasSize.width / 2;
        //get main rect 这里是世界坐标：原点在左下角00
        this.m_mainRect = new cc.Rect();
        this.m_mainRect.size = this.node.getContentSize();
        //动态加载头像
        //先读取角色信息与头像路径
        var playerJob = Global.PLAYER_JOB;
        this.m_HeadPortraitSprite.spriteFrame = Global.GET_HEAD_PORTRAIT_SPRITEFRAME(playerJob);
        //加载角色名称
        this.m_PlayerNameLabel.string = " " + Global.PLAYER_NAME;
        //初始化经验条
        g_LVSliderBeginPos = cc.v2(0 - (this.m_LVSliderUnderSprite.node.width / 2 - this.m_LVSliderSprite.node.width / 2), 0);
        g_LVSliderEndPos = cc.v2(this.m_LVSliderUnderSprite.node.width / 2 - this.m_LVSliderSprite.node.width / 2, 0);
        this.m_LVSliderSprite.node.setPosition(g_LVSliderBeginPos);
        var expPercent = Global.GET_EXP_PERCENT(5,1);
        var lvSliderMoveAct = cc.moveBy(10, cc.v2((g_LVSliderEndPos.x - g_LVSliderBeginPos.x) * expPercent, 0));
        this.m_LVSliderSprite.node.runAction(lvSliderMoveAct);
    },

    onTouchMoveCallback : function(event){
        //滚动背景
        var backgroundPosition = this.m_backgroundSprite.node.position;
        var deltaX = event.getDelta().x;
        if(backgroundPosition.x + deltaX * 1.5 > g_backgroundMaxX){
            this.m_backgroundSprite.node.setPosition(g_backgroundMaxX, 0);
        }
        else if(backgroundPosition.x + deltaX * 1.5 < g_backgroundMinX){
            this.m_backgroundSprite.node.setPosition(g_backgroundMinX, 0);
        }
        else{
            this.m_backgroundSprite.node.setPosition(backgroundPosition.x + deltaX * 1.5, 0);
        }
        //显示箭头
        this.m_leftArrowSprite.node.active = !this.isAttckBtnInMainRect();
        this.m_rightArrowSprite.node.active = !this.isShopBtnInMainRect();
    },

    isAttckBtnInMainRect : function(){
        return this.m_mainRect.contains(this.m_attackBtn.node.convertToWorldSpaceAR(cc.v2(0, 0)));
    },

    isCardBtnInMainRect : function(){
        return this.m_mainRect.contains(this.m_cardBtn.node.convertToWorldSpaceAR(cc.v2(0, 0)));
    },

    isShopBtnInMainRect : function(){
        return this.m_mainRect.contains(this.m_shopBtn.node.convertToWorldSpaceAR(cc.v2(0, 0)));
    },

    onAttackBtnClicked : function(){
        cc.director.loadScene("Attack");
    },

    onCardBtnClicked : function(){
        cc.director.loadScene("Card");
    },

    onShopBtnClicked : function(){
        cc.director.loadScene("Shop");
    },

    start () {

    },

    // update (dt) {},
});
