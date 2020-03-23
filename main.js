const startBtn = document.getElementsByClassName('start-btn')[0]
const gamePanel = document.getElementsByClassName('game-panel')[0]
const startBackground = document.getElementsByClassName('start-background')[0]









//new Flyer(10,{x:10,y:10},{normal:xxx.jpg,destroyed:xxx},{h:1,w:1})
class Flyer{   //敌机类
    constructor(hp,offset,imgs,size,speed) {
        this.hp = hp
        this.offset = offset
        this.imgs = imgs
        this.speed = speed
        this.size = size
        this.type = 2
    }
    createDOM(){
    //    创建一个DOM对象
        let ele = document.createElement('img')
        ele.src = this.imgs.normal
        ele.width = this.size.h
        ele.height = this.size.w
        ele.style.position = 'absolute'
        ele.style.left = this.offset.x + 'px'
        ele.style.top = this.offset.y + 'px'
        ele.obj = this      //页面->内存
        this.ele = ele      //内存-->页面
        gamePanel.appendChild(ele)
    }
    move(diction,speed){
        // console.log('当前飞机飞向',diction,'速度是',speed)
        let islife
        if((diction === 'w') ||(diction === 's')){
            let top = this.ele.offsetTop + speed
            islife = this.checkRange(diction,top)
            // console.log(islife)
            if(islife)
                this.ele.style.top = top + 'px'
        }else if((diction === 'a') ||(diction === 'd')){
            let left = this.ele.offsetLeft + speed
            islife = this.checkRange(diction,left)
            if(islife){
                this.ele.style.left = left + 'px'
            }
        }
        if(!islife){
            this.destory()
        }
    }

    moveBefore(){
        let self = this
        this.timer = setInterval(()=>{
            self.move('s',self.speed)
        },100)
    }
    checkRange(diction,dist){
        switch (diction) {
            case 'w':
                if(dist < gamePanel.offsetTop) return false
                break
            case 's':
                if (dist > gamePanel.offsetHeight - this.size.h) return false
                break
            case 'a':
                // gamePanel.offsetLeft不是0  所以手动设置为0
                if (dist < 0) return false
                break
            case 'd':
                if (dist > gamePanel.offsetWidth - this.size.w) return false
                break
        }
        return  true
    }
    destory(){
        //    清除定时器，删除DOM元素
        clearInterval(this.timer)
        gamePanel.removeChild(this.ele)
    }

}










//定义自己的飞机
class MyPlane{  //定义自己的飞机
    constructor(hp,offset,imgs,size,speed) {
        this.hp = hp
        this.offset = offset
        this.imgs = imgs
        this.speed = speed
        this.size = size
        this.type = 1
        this.MyPlaneMove = this.MyPlaneMove.bind(this)   //why?
    }
    createDOM(){
        //    创建一个DOM对象
        let ele = document.createElement('img')
        ele.src = this.imgs.normal
        ele.width = this.size.h
        ele.height = this.size.w
        ele.style.position = 'absolute'
        ele.style.left = this.offset.x + 'px'
        ele.style.top = this.offset.y + 'px'
        ele.id = 'myplane'
        //双向数据绑定
        ele.obj = this      //页面->内存
        this.ele = ele      //内存-->页面
        gamePanel.appendChild(ele)
    }
    move(diction,speed){
        if((diction === 'w') ||(diction === 's')){
            let top = this.ele.offsetTop + speed

            if(this.checkRange(diction,top)){
                this.ele.style.top = top + 'px'
            }

        }else if((diction === 'a') ||(diction === 'd')){
            let left = this.ele.offsetLeft + speed
            if(this.checkRange(diction,left)){
                this.ele.style.left = left + 'px'
            }
        }

    }
    MyPlaneMove(e){
        let offsetPoint = this.speed
        switch(e.key){
            case 'w':
            case 'a':
                offsetPoint = 0 - this.speed
                break
            case 'd':
            case 's':
                break
            default:
                return
        }
        this.move(e.key,offsetPoint)
    }
    MyPlaneMoveBefore(){
        document.addEventListener('keypress',this.MyPlaneMove)
    }
    MyPlaneMoveAfter(){
        document.removeEventListener('keypress',this.MyPlaneMove)
    }
//    判断飞出范围
   checkRange(diction,dist){
        switch (diction) {
            case 'w':
                if(dist < gamePanel.offsetTop) return false
                break
            case 's':
                if (dist > gamePanel.offsetHeight - this.size.h) return false
                break
            case 'a':
                // gamePanel.offsetLeft不是0  所以手动设置为0
                if (dist < 0) return false
                break
            case 'd':
                if (dist > gamePanel.offsetWidth - this.size.w) return false
                break
        }
        return  true
   }
}




class Bullet{
    constructor(hp,offset,imgs,size,speed) {
        this.hp = hp
        this.offset = offset
        this.imgs = imgs
        this.speed = speed
        this.size = size
        this.type = 3
    }createDOM(){
        //    创建一个DOM对象
        let ele = document.createElement('img')
        ele.src = this.imgs.normal
        ele.width = this.size.h
        ele.height = this.size.w
        ele.style.position = 'absolute'
        ele.style.left = this.offset.x + 'px'
        ele.style.top = this.offset.y + 'px'
        ele.id = 'myplane'
        //双向数据绑定
        ele.obj = this      //页面->内存
        this.ele = ele      //内存-->页面
        gamePanel.appendChild(ele)
    }move(diction,speed){
        // console.log('当前飞机飞向',diction,'速度是',speed)
        let islife
        if((diction === 'w') ||(diction === 's')){
            let top = this.ele.offsetTop - speed
            islife = this.checkRange(diction,top)
            if(islife)
                this.ele.style.top = top + 'px'
        }else if((diction === 'a') ||(diction === 'd')){
            let left = this.ele.offsetLeft + speed
            islife = this.checkRange(diction,left)
            if(islife){
                this.ele.style.left = left + 'px'
            }
        }
        if(!islife){
            this.destory()
        }

    }

    moveBefore(){
        let self = this
        this.timer = setInterval(()=>{
            self.move('w',self.speed)
        },100)
    }
    checkRange(diction,dist){
        switch (diction) {
            case 'w':
                if(dist < gamePanel.offsetTop) return false
                break
            case 's':
                if (dist > gamePanel.offsetHeight - this.size.h) return false
                break
            case 'a':
                // gamePanel.offsetLeft不是0  所以手动设置为0
                if (dist < 0) return false
                break
            case 'd':
                if (dist > gamePanel.offsetWidth - this.size.w) return false
                break
        }
        return  true
    }
    destory(){
        //    清除定时器，删除DOM元素
        clearInterval(this.timer)
        gamePanel.removeChild(this.ele)
    }

}






//初始化游戏
function GameMaster() {
    this.init()
}
GameMaster.prototype.init = function(){
    startBtn.onclick = ()=>{
        gamePanel.style.display = 'block'
        startBackground.style.display = 'none'
        startBtn.style.display = 'none'
        this.run()
    }

}
GameMaster.prototype.run = function () {
    // alert('游戏成功运行')
//    启动一个我的飞机
    setInterval(()=>{
        let flyer = new Flyer(1,{x:random(),y:0},{normal:'./images/plane1.png',destroyed:'./images/plane1_die1.png'},{h:50,w:50},20)
        flyer.createDOM()
        flyer.moveBefore()},500)
    setInterval(()=>{
        let bulletPosition = {x:Myflyer.ele.offsetLeft+(Myflyer.size.w/2),y:Myflyer.ele.offsetTop+20}
        let bullet = new Bullet(1,bulletPosition,{normal:'./images/bullet.png'},{h:5,w:20},10)
        bullet.createDOM()
        bullet.moveBefore()
    },400)
    let Myflyer = new MyPlane(10,{x:200,y:400},{normal:'./images/me.png',destroyed:'./images/me_die1.png'},{h:100,w:100},20)
    Myflyer.createDOM()
    Myflyer.MyPlaneMoveBefore()
}
function gameStart(){
    new GameMaster()  //创建游戏管理实例
}
function random(){
    return Math.random()*(gamePanel.offsetWidth-50)
}

window.onload = gameStart