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
        m_PlayerInfoRichText : cc.RichText,
        m_leftButton : cc.Button,
        m_rightButton : cc.Button,
        m_allPlayerPicsVec: {
            type: cc.Texture2D,
            default: []
        },
        m_json : cc.JsonAsset,
        m_PlayerInfoStrVec : [],
        m_playerPicBeginPos : cc.v2(-1300, 0),
        m_playerPicEndPos : cc.v2(-500, 0),
        m_playerInfoBeginPos : cc.v2(1400, 260),
        m_playerInfoEndPos : cc.v2(480, 260),
        m_loadTime : 1,
        m_currentPlayerPicIndex : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化左侧立绘
        this.m_playerPic.spriteFrame.setTexture(this.m_allPlayerPicsVec[this.m_currentPlayerPicIndex]);
        //左侧立绘动画
        this.m_playerPic.node.setPosition(this.m_playerPicBeginPos);
        var playerPicMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerPicEndPos);
        this.m_playerPic.node.runAction(playerPicMoveAct);
        //右侧info动画
        this.m_playerInfo.node.setPosition(this.m_playerInfoBeginPos);
        var playerInfoMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerInfoEndPos);
        this.m_playerInfo.node.runAction(playerInfoMoveAct);
        //初始化json数据
        var json = this.m_json.json;
        var playerJsonVec = json.player;
        for(let i = 0; i < playerJsonVec.length; i++)
        {
            var str = playerJsonVec[i].Describe;
            this.m_PlayerInfoStrVec.push(str);
        }
        cc.log(this.m_PlayerInfoStrVec);
        //初始化info
        this.m_PlayerInfoRichText.string = this.m_PlayerInfoStrVec[this.m_currentPlayerPicIndex];
    },

    onLeftButtonClicked : function() {
        //获取资源序号
        var toUseIndex = this.getLeftPlayerPicIndex(this.m_currentPlayerPicIndex); 
        this.m_currentPlayerPicIndex = toUseIndex;  
        this.changePicAction();
    },

    onRightButtonClicked : function() {
        //获取资源序号
        var toUseIndex = this.getRightPlayerPicIndex(this.m_currentPlayerPicIndex);
        this.m_currentPlayerPicIndex = toUseIndex;
        this.changePicAction();
    },

    changePicAction : function(){   
        //收起立绘动作
       var closePlayerMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerPicBeginPos);
       //推出立绘动作
       var openPlayerMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerPicEndPos);
       //序列
       var changPlayerSequence = cc.sequence(cc.callFunc(this.leftRightButtonEnable, this, false)
           , closePlayerMoveAct
           , cc.callFunc(this.changePic, this)
           , openPlayerMoveAct
           , cc.callFunc(this.leftRightButtonEnable, this, true));
       this.m_playerPic.node.runAction(changPlayerSequence);

       //操作简介板
       var closePlayerInfoMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerInfoBeginPos);
       var openPlayerInfoMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerInfoEndPos);
       var changePlayerInfoSequence = cc.sequence(closePlayerInfoMoveAct
            , cc.callFunc(this.changeInfo, this)
            , openPlayerInfoMoveAct);
        this.m_playerInfo.node.runAction(changePlayerInfoSequence);
    },

    getLeftPlayerPicIndex : function(currentIndex) {
        var vecSzie = this.m_allPlayerPicsVec.length;
        if(currentIndex == 0)
        {
            return vecSzie - 1;
        }
        return currentIndex - 1;
    },

    getRightPlayerPicIndex : function(currentIndex) {
        var vecSzie = this.m_allPlayerPicsVec.length;
        if(currentIndex == vecSzie - 1)
        {
            return 0;
        }
        return currentIndex + 1;
    },

    changePic : function(){
        this.m_playerPic.spriteFrame = new cc.SpriteFrame(this.m_allPlayerPicsVec[this.m_currentPlayerPicIndex]);
    },

    changeInfo : function(){
        this.m_PlayerInfoRichText.string = this.m_PlayerInfoStrVec[this.m_currentPlayerPicIndex];
    },

    leftRightButtonEnable : function(target, isEnable){
        //回调第一个必须接target
        this.m_rightButton.interactable = isEnable;
        this.m_leftButton.interactable = isEnable;
    },

    start () {

    },

    // update (dt) {},
});
