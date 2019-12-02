//创建角色界面

cc.Class({
    extends: cc.Component,

    properties: {
        m_playerPic : cc.Sprite,
        m_playerInfo : cc.Sprite,
        m_PlayerInfoRichText : cc.RichText,
        m_editBox : cc.EditBox,
        m_leftButton : cc.Button,
        m_rightButton : cc.Button,
        m_buttonAndLineEditBox : cc.Node,
        m_loadingLabel : cc.Label,
        m_allPlayerPicsVec: {
            type: cc.Texture2D,
            default: []
        },
        m_json : cc.JsonAsset,
        m_PlayerInfoStrVec : [],
        m_JobVec : [],
        m_playerPicBeginPos : cc.v2(-1300, 0),
        m_playerPicEndPos : cc.v2(-500, 0),
        m_playerInfoBeginPos : cc.v2(1400, 260),
        m_playerInfoEndPos : cc.v2(480, 260),
        m_buttonAndLineEditBoxBeginPos : cc.v2(960, 0),
        m_buttonAndLineEditBoxEndPos : cc.v2(0, 0),
        m_loadingLabelBeginPos : cc.v2(0, 800),
        m_loadingLabelEndPos : cc.v2(0, 0),
        m_loadTime : 1,
        m_currentPlayerPicIndex : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化loading
        this.m_loadingLabel.node.setPosition(this.m_loadingLabelBeginPos);
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
        //右侧按钮动画
        this.m_buttonAndLineEditBox.setPosition(this.m_buttonAndLineEditBoxBeginPos);
        var buttonAndLineEditBoxMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_buttonAndLineEditBoxEndPos);
        this.m_buttonAndLineEditBox.runAction(buttonAndLineEditBoxMoveAct);
        //初始化json数据
        var json = this.m_json.json;
        var playerJsonVec = json.player;
        for(let i = 0; i < playerJsonVec.length; i++)
        {
            var str = playerJsonVec[i].Describe;
            this.m_PlayerInfoStrVec.push(str);
            var job = playerJsonVec[i].Job;
            this.m_JobVec.push(job);
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

    onOKButtonClicked : function(){
        //检查是否有名字
        //检查名字格式
        //检查数据库内是否有相同名称
        //存储
        Global.PLAYER_NAME  = this.m_editBox.string;
        Global.PLAYER_JOB = this.m_JobVec[this.m_currentPlayerPicIndex];
        Global.PLAYER_LV = 1;
        Global.PLAYER_MAXHP = 10;
        Global.PLAYER_MAXMP = 1;
        //转场
        //左侧立绘动画
        this.m_playerPic.node.setPosition(this.m_playerPicEndPos);
        var playerPicMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerPicBeginPos);
        this.m_playerPic.node.runAction(playerPicMoveAct);
        //右侧info动画
        this.m_playerInfo.node.setPosition(this.m_playerInfoEndPos);
        var playerInfoMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_playerInfoBeginPos);
        this.m_playerInfo.node.runAction(playerInfoMoveAct);
        //右侧按钮动画
        this.m_buttonAndLineEditBox.setPosition(this.m_buttonAndLineEditBoxEndPos);
        var buttonAndLineEditBoxMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_buttonAndLineEditBoxBeginPos);
        this.m_buttonAndLineEditBox.runAction(buttonAndLineEditBoxMoveAct);
        //loading
        this.m_loadingLabel.node.setPosition(this.m_loadingLabelBeginPos);
        var loadingMoveAct = cc.moveTo(this.m_loadTime / 2, this.m_loadingLabelEndPos);
        this.m_loadingLabel.node.runAction(loadingMoveAct);
        cc.director.loadScene("Main");
    },
    start () {

    },

    // update (dt) {},
});
