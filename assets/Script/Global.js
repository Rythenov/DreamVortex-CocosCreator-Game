// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var HEAD_PORTRAIT_SPRITEFRAME_VEC = new Array();
window.Global = {
    extends: cc.Component,
    USER_EMAIL : null,
    USER_PASSWORD : null,
    PLAYER_NAME : null,
    PLAYER_JOB : null,
    PLAYER_LV : null,
    PLAYER_MAXHP : null,
    PLAYER_MAXMP : null,
    PLAYER_EXP : null,
    PLAYER_CARDSTACK : null,
    PLAYER_CARDGROUP : null,
    PLAYER_CURRENT_CARDGROUP : null,
    PLAYER_GOLD : null,
    LV_JSON : cc.JsonAsset,
    JOB_JSON : cc.JsonAsset,


    LOAD_ALL_RES : function(){

        //加载等级经验文件
        cc.loader.loadRes('/Json/LV', cc.JsonAsset, function(err, ccjson) {
            if (err) {
                cc.log(err.message || err);
                return;
            }
            else{
                this.LV_JSON = ccjson;
                return;
            }
        });//加载等级经验文件END
        //加载所有职业相关信息
        cc.loader.loadRes('/Json/CreatePlayer', cc.JsonAsset, function(err, ccjson) {
            if (err) {
                cc.log(err.message || err);
                return;
            }
            else{
                this.JOB_JSON = ccjson;
                var json = JOB_JSON.json;
                var playerJsonVec = json.player;                
                //加载头像
                for(let i = 0; i < playerJsonVec.length; i++)
                {
                    var playerHeadPortraitUrl = playerJsonVec[i].HeadPortrait;
                    var job = playerJsonVec[i].Job;
                    cc.loader.loadRes(playerHeadPortraitUrl, cc.SpriteFrame, function(err, spFrame) {
                        if (err) 
                        {
                            cc.log(err.message || err);
                            return;
                        }
                        else
                        {
                            HEAD_PORTRAIT_SPRITEFRAME_VEC.push(spFrame);
                        }
                    });
                }//加载头像END
                return;
            }
        });//加载所有职业相关信息END
    },

    GET_EXP_PERCENT : function(exp, lv)
    { 
        var expVec = LV_JSON.json.LV;
        return exp / expVec[lv].MaxExp;
        /*for(let i = 0; i < expVec.length; i++)
        {
            if(playerJsonVec[i].Job == playerJob){
                playerHeadPortraitUrl = playerJsonVec[i].HeadPortrait;
                break;
            }
        }*/
    },

    GET_HEAD_PORTRAIT_SPRITEFRAME : function(job){
        for(let i = 0; i < HEAD_PORTRAIT_SPRITEFRAME_VEC.length; i++)
        {
            if(HEAD_PORTRAIT_SPRITEFRAME_VEC[i].name == job)
            {
                return HEAD_PORTRAIT_SPRITEFRAME_VEC[i];
            }
        }
    },
};