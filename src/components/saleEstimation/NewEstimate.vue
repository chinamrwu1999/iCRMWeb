<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, onBeforeMount } from "vue"
import HospitalService from "../hospital/HospitalService"
import CommonService from "../../services/CommonService.ts"
import service from "./EstimateService"



const search = {
    Citys: '',
    Txt: ''
}


const pageSize = 10
const errors = ref(null)
const childWindow = ref('')
const selected = ref(-1)
const pageData = ref({
    pageSize: pageSize,
    page: 0,
    startIndex: 0,
    totalRows: 0,
    totalPages: 0,
    rows: Array<any>(),
    sort: ''

})
const error = ref("")

const years = ref(Array<number>())
const year = ref(2022)


const products = ref(Array<any>())
onMounted(() => {
    CommonService.listTopAreas().then(data => {
        topAreas.value = data
    }).then(() => {
        HospitalService.MyHospitals(pageSize).then(res => {
            pageData.value = res
        }).catch(error => errors.value = error)
    }).catch(error => errors.value = error)

    CommonService.allProducts().then(res => {

        products.value = res
    }).catch(error => errors.value = error)

    let year1 = new Date().getFullYear()
    year.value = year1
    years.value = [year1, year1 + 1, year1 + 2, year1 + 3]




}




)

////////////////////////////***********////////////////////////////////

/***************************************** */





function getPageData(index: number) {
    if (index < 0 || index > pageData.value.totalPages) return;
    HospitalService.pageHospitals(search, pageSize, index).then(res => {
        //console.log(pageData.value)
        pageData.value.rows = res.rows;
        pageData.value.page = index;
        pageData.value.startIndex = res.startIndex

    }).catch(e1 => errors.value = e1)
}
function LikeName() {
    search.Citys = ''
    HospitalService.queryHospitals(search, pageSize).then(res => {
        pageData.value = res
    })
}

/************************* 动态下拉框************************************ */

const topAreas = ref(Array<any>())

function getChildAreas(event: any) {

    let value = event.target.value
    let target = event.target as HTMLElement
    let sibling = target.nextSibling;
    while (sibling) {
        target.parentNode?.removeChild(sibling)
        sibling = target.nextSibling;
    }

    if (value && value != '') {
        CommonService.listChildAreas(value).then(res => {
            if (res?.length > 0) {
                //  console.log(res)

                let select = document.createElement("select");

                let option = document.createElement("option");
                option.innerText = '请选择'
                option.setAttribute("value", '')
                select.append(option);

                res.forEach(el => {
                    let option = document.createElement("option");
                    option.innerText = el.Name
                    option.setAttribute("value", el.Code)
                    select.append(option);
                });
                select.addEventListener("change", getChildAreas)
                target.parentNode.appendChild(select)

            }
            search.Citys = value
            HospitalService.queryHospitals(search, pageSize).then(data => {
                pageData.value = data

            })

        })
    } else {
        let preSibling = target.previousSibling as HTMLSelectElement || null
        if (preSibling != null) {
            search.Citys = preSibling.value
            HospitalService.queryHospitals(search, pageSize).then(data => {
                pageData.value = data

            })

        } else {
            HospitalService.MyHospitals(pageSize).then(data => {
                pageData.value = data

            })
        }
    }




}
function changeYear(event) {
    console.log(event.target.value)
}

function saveData() {
    let rows: NodeListOf<Element> = document.querySelectorAll(".list > .body > .row")
    if (rows?.length > 0) {
        let data = new Array<any>()
        let user = JSON.parse(localStorage.getItem("userId"))

        rows.forEach(row => {
            let span = row.querySelector(".hospitalName")
            let hospId = parseInt(span.getAttribute("data-value"))

            let productSelect = row.querySelector(".products > select") as HTMLSelectElement
            let productId = productSelect.value
            //console.log(productId)
            let inputs = row.querySelectorAll(".quaterInput")
            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i]
                let element = input.firstElementChild as HTMLInputElement
                let s1 = element.getAttribute("name")
                let month = parseInt(s1?.substring(5))

                let saleNumber = parseInt(element.value)
                saleNumber = isNaN(saleNumber) ? 0 : saleNumber
                let price = parseFloat((input.lastElementChild as HTMLInputElement).value)
                price = isNaN(price) ? 0 : price
                let obj = {
                    CustomerId: hospId,
                    ProductId: productId,
                    Year: year.value,
                    Month: month,
                    Amount: saleNumber,
                    Price: price,
                    Submiter: user?.ID

                }

                if (saleNumber * price != 0) { data.push(obj) }
                //console.log(data)

            }

        })
        // console.log(data)
        service.save(data).then(res => {
            //console.log(res)
        })
    }
}
/************************************************************** */
function changeProduct(event: any) {
    let value = event.target.value;
    products.value.forEach(e => {
        if (e.ProductId === value) {
            let inputs = event.target.parentNode.parentNode.querySelectorAll(".quaterInput")
            inputs.forEach(el => {
                let e0 = el.lastElementChild as HTMLInputElement
                e0.value = e.BasePrice

                //  let e1=el.firstElementChild as HTMLInputElement
                //  e1.value=null
            })

            SumRow(event.target.parentNode.parentNode)



        }
    });


}

function SumRow(row: HTMLDivElement) {
    let inputs = row.querySelectorAll(".quaterInput")
    let amount = 0;
    let total = 0;
    for (let i = 0; i < inputs.length; i++) {
        let k0 = inputs[i]
        let d1 = parseInt((k0.firstElementChild as HTMLInputElement).value)
        let d2 = parseFloat((k0.lastElementChild as HTMLInputElement).value)

        if (!(isNaN(d1) || isNaN(d2))) {
            amount += d1;
            total += d1 * d2
        }

    }
    let div = row.lastElementChild
    if (total * amount > 0) {
        div.firstElementChild.innerText = amount
        div.lastElementChild.innerText = total
    } else {
        div.firstElementChild.innerText = ''
        div.lastElementChild.innerText = ''
    }
}

function SumColumn(columnIndex: string) {

    // let elements=document.querySelectorAll(`.list > .body > .row > .quaterInput > input[name="${s1}"]`)
    let rows = document.querySelectorAll(`.list > .body > .row `)
    let amounts = Array<number>()
    let prices = Array<number>()
    for (let i = 0; i < rows.length; i++) {
        amounts.push(0)
        prices.push(0)
    }

    let s1 = `input${columnIndex}`
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i] as HTMLDivElement
        let months = row.querySelectorAll(`.quaterInput`)
        
        for (let j = 0; j < months.length; j++) {
            let month = months[j] as HTMLElement
            let input=month.firstChild as HTMLInputElement
            let name = input.getAttribute("name")
            if (name === s1) {
              
                let d0 = parseInt(input.value)
                if (!isNaN(d0)) {
                    amounts[i] = d0
                }
                input=month.lastChild as HTMLInputElement
                d0 = parseFloat(input.value)
                if (!isNaN(d0)) {
                    prices[i] = d0
                }
                break
            }
        }

    }
    let totals = 0, sum = 0;
    for (let i = 0; i < rows.length; i++) {
        let k = amounts[i] * prices[i]
        if (k > 0) {
            totals += amounts[i]
            sum += k
        }
    }
    //console.log(totals, "  ==== ", sum)
    let index=parseInt(columnIndex)
    let tail=document.querySelectorAll(".tailRow > .quaterInput")
    tail[index-1].firstElementChild.innerText=`${totals}`
    tail[index-1].lastElementChild.innerText=`${sum}`
    
    SumTotals()
}

function SumTotals(){
    let rows = document.querySelectorAll(`.list > .body > .row > .sum`)
    let amounts = Array<number>()
    let prices = Array<number>()
    for (let i = 0; i < rows.length; i++) {
        amounts.push(0)
        prices.push(0)
    }

    for(let i=0;i<rows.length;i++){
        let s1=rows[i].firstElementChild.innerText
        let d0=parseInt(s1)
        if(!isNaN(d0)){
            amounts[i]=d0
        }
        s1=rows[i].lastElementChild.innerText
        d0=parseInt(s1)
        if(!isNaN(d0)){
            prices[i]=d0
        }
    }
    let totals=0;
    let sum=0;
    for(let i=0;i<rows.length;i++){
        
        totals+=amounts[i]
        sum+=prices[i]
    }

    let target=document.querySelector(".tailRow > .sum") 
    target.firstElementChild.innerText=`${totals}`
    target.lastElementChild.innerText=`${sum}`
}


function resetInputs() {
    let rows: NodeListOf<Element> = document.querySelectorAll(".list > .body > .row")
    if (rows?.length > 0) {
        rows.forEach(row => {
            let select = row.querySelector(".products > select") as HTMLSelectElement
            select.selectedIndex = 0

            let inputs = row.querySelectorAll("input")
            inputs.forEach(input => {
                input.value = null
            })

        })
    }
}
/******************************************************** */
function inputBlur(event: any) {
    let row = event.target.parentNode.parentNode
    let name=event.target.getAttribute("name")

    SumRow(row)
    SumColumn(name.substring(5))
}

</script>
<template>
    <div class="main1">
        <header>

            <div class="topArea" id="areas">
                <select name="myAreas" @change="getChildAreas($event)">
                    <option value="">区域</option>
                    <option :value="item.Code" v-for="item in topAreas">{{ item.Name }}</option>
                </select>
            </div>
            <span>
                <input type="text" v-model="search.Txt" />
                <button @click="LikeName()">查询</button>

            </span>
            <span>
                <button @click="saveData()">保存</button>
                <button @click="resetInputs()">重置</button>
                <!-- <button @click="SumColumn('3')">测试</button> -->
            </span>
            <span style="margin-right:3em;">

            </span>


        </header>
    </div>
    <div class="list">
        <header
            style="display:flex;flex-flow:row nowrap;align-items: center;justify-content: center;font-size:1.3em;color:white;">
            <div> <select name="years" @change="changeYear($event)" v-model="year">
                    <option value="">______年份</option>

                    <option v-for="year in years" :value="year">{{ year }}年</option>
                </select>销售预估</div>
        </header>

        <template v-if="pageData?.rows?.length > 0">
            <div class="header">
                <span class="index">序号</span>
                <span class="province">省市</span>

                <span style="width:45em;">医院名称/代理商</span>
                <span class="products">产品</span>
                <div class="quarters">
                    <div class="quarter">
                        <!-- <div class="QT">
                            QT1
                        </div> -->
                        <div class="QTmonths">
                            <span class="month">1月</span>
                            <span class="month">2月</span>
                            <span class="month">3月</span>
                        </div>
                    </div>
                    <div class="quarter">
                        <!-- <div class="QT">
                            QT2
                        </div> -->
                        <div class="QTmonths">
                            <span class="month">4月</span>
                            <span class="month">5月</span>
                            <span class="month">6月</span>
                        </div>
                    </div>
                    <div class="quarter">
                        <!-- <div class="QT">
                            QT3
                        </div> -->
                        <div class="QTmonths">
                            <span class="month">7月</span>
                            <span class="month">8月</span>
                            <span class="month">9月</span>
                        </div>
                    </div>
                    <div class="quarter">
                        <!-- <div class="QT">
                            QT4
                        </div> -->
                        <div class="QTmonths">
                            <span class="month">10月</span>
                            <span class="month">11月</span>
                            <span class="month">12月</span>
                        </div>
                    </div>
                    <div class="sum">
                        合计
                    </div>
                </div>

                <!-- <div class="quarters">
                    <div class="quarter">
                        <div>
                             QT1
                        </div>
                        <div>
                            <span class="month">1月</span>
                            <span class="month">2月</span>
                            <span class="month">3月</span>
                        </div>
                    </div>
                   
                </div> -->




            </div>
            <div class="body">
                <div class="row" style="height:4.5em;" v-for="item, index in pageData.rows">
                    <span class="index">{{ pageData.startIndex + index + 1 }}</span>
                    <span class="province">{{ item.Province }}{{ item.City }}</span>
                    <div class="hostProxy">
                        <span class="hospitalName" v-bind:data-value='item.ID'>{{ item.Name }}</span>
                        <span class="proxy" v-bind:data-value='item.ID'>广州凯普生物</span>
                    </div>

                    <span class="products">
                        <select @change="changeProduct($event)">
                            <option value="ACKLDT">选择产品</option>
                            <option :value="item.ProductId" v-for="item in products">{{ item.Name }}</option>

                        </select>
                    </span>
                    <div class="quaterInput">
                        <input type="number" name="input1" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price1" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input2" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price2" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input3" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price3" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input4" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price4" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input5" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price5" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input6" placeholder="预估量" @blur="inputBlur($event)" />
                        <input type="number" name="price6" placeholder="价格" @blur="inputBlur($event)" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input7" placeholder="预估量" />
                        <input type="number" name="price7" placeholder="价格" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input8" placeholder="预估量" />
                        <input type="number" name="price8" placeholder="价格" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input9" placeholder="预估量" />
                        <input type="number" name="price9" placeholder="价格" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input10" placeholder="预估量" />
                        <input type="number" name="price10" placeholder="价格" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input11" placeholder="预估量" />
                        <input type="number" name="price11" placeholder="价格" />
                    </div>
                    <div class="quaterInput">
                        <input type="number" name="input12" placeholder="预估量" />
                        <input type="number" name="price12" placeholder="价格" />
                    </div>
                    <div class="sum">
                        <span class="sumSale"></span>
                        <span class="sumMoney"></span>
                    </div>
                </div>

                <div class="tailRow">
                    <span class="index"></span>
                    <span class="province"></span>
                    <div class="hostProxy">
                        <span class="hospitalName"></span>
                        <span class="proxy"> </span>
                    </div>

                    <div class="products">
                        合计
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="quaterInput">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="sum">
                        <span class="sumSale"></span>
                        <span class="sumMoney"></span>
                    </div>
                </div>
            </div>
            <div class="footer">
                <span></span>
                <span></span>
                <span>
                    <template v-if="pageData.page > 0">
                        <button @click="getPageData(pageData.page - 1)">
                            &#x3c;&#x3c;前一页
                        </button>
                    </template>
                </span>
                <span>
                    共有
                    <b style="padding-left: 1em;padding-right:1em;color:red">
                        {{ pageData.totalRows }}
                    </b>行记录
                    <b style="padding-left: 1em;padding-right:1em;color:red">
                        {{ pageData.totalPages }}
                    </b>页,当前是第
                    <b style="padding-left: 1em;padding-right:1em;color:red">
                        {{ pageData.page + 1 }}
                    </b>页
                </span>
                <span>
                    <template v-if="pageData.page < pageData.totalPages - 1">
                        <button @click="getPageData(pageData.page + 1)">
                            下一页 &#x3e;&#x3e;
                        </button>
                    </template>
                </span>
                <span></span>
                <span>

                </span>
            </div>
        </template>
        <template v-else-if="errors">
            <div class="error">
                <span>错误信息：{{ errors }}</span>
            </div>
        </template>
        <template v-else>
            <div class="loading" style="text-align:center;">
                <span>Sorry,没有找到数据哦.....</span>
            </div>
        </template>
    </div>
    <!-- <Teleport to=".list" v-if="childWindow == 'update'">
        <HospitalUpdater :hospital-id="selected" @close-window="closeChild()" />
    </Teleport> -->
</template>
<style scoped>
.tailRow {
    width: 100%;
    height: 4.5em;
    min-height: 2em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: solid 1px #e9ecf8;
    padding-left: 1em;



}

.tailRow>.products {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

}

.tailRow>.quaterInput>span:first-child {
    color: blue;
}

.tailRow>.quaterInput>span:last-child {
    color: red;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.main1 {
    width: 100%;
    height: 3em;
    padding: 0.2em;
    display: flex;
    flex-flow: column nowrap;
    border-top: solid 1px #141e30;
}

header {
    height: 2.5em;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding-left: 1em;
    padding-right: 1em;

}

.quarters {
    width: 60em;
    display: flex;
    flex-flow: row nowrap;
}

.quarter {
    width: 12em;
    display: flex;
    flex-flow: column nowrap;
}

.sum {
    width: 10em;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
}


.quaterInput {
    width: 4em;
    height: 4.5em;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}

.quaterInput>input {
    width: 4em;
    outline: none;
    border: none;
    border-bottom: solid 1px gray;
    border-right: solid 1px gray;
    height: 2em;
    line-height: 2em;
    font-size: 1.0em;
    text-align: center;
}


.QT {

    text-align: center;
}

.QTmonths {
    display: flex;
    flex-flow: row nowrap;
}

.month {
    width: 4em;
    text-align: center;
}

.index {
    width: 3em;
}

.province {
    width: 8em;
}

.hostProxy {
    height: 4em;
    width: 40em;
    padding-left: 1em;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
}

.hospitalName {
    width: 100%;
    color: blue;
}

.proxy {
    width: 100%;

}

.products {
    width: 8em;

}

.sumSale {
    border-bottom: solid 1px gray;
    color: blue;
    text-align: center;

}

.sumMoney {
    color: red;
    text-align: center;
}

.buttons {
    text-align: right;
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ebb9ae;
    opacity: 1;
    /* Firefox */
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    color: red;
}
</style>