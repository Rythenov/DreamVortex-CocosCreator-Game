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
       m_backgroundSprite : cc.Sprite,
       m_attackBtn : cc.Button,
       m_cardBtn : cc.Button,
       m_shopBtn : cc.Button,
       m_leftArrow : cc.Sprite,
       m_rightArrow : cc.Sprite,
       m_mainRect : cc.Rect,
       m_backgroundMinX : 0,
       m_backgroundMaxX : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
        var backgroundSize = this.m_backgroundSprite.node.getContentSize();
        var canvasSize = this.node.getContentSize();
        this.m_backgroundMinX = 0 - backgroundSize.width / 2 + canvasSize.width / 2;
        this.m_backgroundMaxX = 0 + backgroundSize.width / 2 - canvasSize.width / 2;
        //get main rect 这里是世界坐标：原点在左下角00
        this.m_mainRect = new cc.Rect();
        this.m_mainRect.size = this.node.getContentSize();
        
    },

    onTouchMoveCallback : function(event){
        //滚动背景
        var backgroundPosition = this.m_backgroundSprite.node.position;
        var deltaX = event.getDelta().x;
        if(backgroundPosition.x + deltaX * 1.5 > this.m_backgroundMaxX){
            this.m_backgroundSprite.node.setPosition(this.m_backgroundMaxX, 0);
        }
        else if(backgroundPosition.x + deltaX * 1.5 < this.m_backgroundMinX){
            this.m_backgroundSprite.node.setPosition(this.m_backgroundMinX, 0);
        }
        else{
            this.m_backgroundSprite.node.setPosition(backgroundPosition.x + deltaX * 1.5, 0);
        }
        //显示箭头
        this.m_leftArrow.node.active = !this.isAttckBtnInMainRect();
        this.m_rightArrow.node.active = !this.isShopBtnInMainRect();
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
