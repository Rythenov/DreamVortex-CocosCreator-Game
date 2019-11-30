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
        m_playerPic : cc.Sprite,
        m_playerInfo : cc.Sprite,
        m_leftButton : cc.Button,
        m_rightButton : cc.Button,
        m_playerPicBeginPos : cc.v2(-1300, 0),
        m_playerPicEndPos : cc.v2(-500, 0),
        m_playerInfoBeginPos : cc.v2(1400, 260),
        m_playerInfoEndPos : cc.v2(480, 260),
        m_loadTime : 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //左侧立绘动画
        this.m_playerPic.node.setPosition(this.m_playerPicBeginPos);
        var playerPicMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerPicEndPos);
        this.m_playerPic.node.runAction(playerPicMoveAct);
        //右侧info动画
        this.m_playerInfo.node.setPosition(this.m_playerInfoBeginPos);
        var playerInfoMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerInfoEndPos);
        this.m_playerInfo.node.runAction(playerInfoMoveAct);
    },

    onLeftButtonClicked : function() {

    },

    onRightButtonClicked : function() {

    },

    start () {

    },

    // update (dt) {},
});
