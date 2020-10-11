function dc_log(...a) {
    console.log(...a);
}
function dc_error(...a) {
    console.error(...a);
}

function dc_isArray(variable){
    return Array.isArray(variable);
}

function dc_isObject(variable){
    return typeof variable === 'object' && Array.isArray(variable) === false && variable !== null;
}

function dc_isFunction(variable){
    return typeof variable === 'function';
}

function _availableSelfData(data){
    return dc_isArray(data) ? data : Object.values(data);
}

class dcollect{

    constructor(data){
        this.data = data;
    }

    query(){
        if(Array.isArray(this.data)){
            return new _builder(Array.from(this.data), this);
        }
        return new _builder(Object.assign({}, this.data), this);
    }
}

class _builder{
    constructor(data, parent = null){
        this.parent = parent;
        this.data   = data;
    }

    where(field, condition, target){
        this.data = this.data.filter(function (obj) {
            let src = obj[field];
            switch (condition) {
                case '>':   return src > target;
                case '<':   return src < target;
                case '>=':  return src >= target;
                case '<=':  return src <= target;
                case '=':  return src == target;
                case '==':  return src == target;
                case '!=':  return src != target;
                case '<>':  return src != target;
                case '===': return src === target;
                case '!==': return src !== target;
            }
            return false;
        });

        return this;
    }

    whereLike(field, target, i = false){
        this.data = this.data.filter(function (obj) {
            if(!i){
                return obj[field].indexOf(target) > -1;
            }
            else{
                return obj[field].toLowerCase().indexOf(target.toLowerCase()) > -1
            }
        });
        return this;
    }

    whereIn(field, data){

        if(!Array.isArray(data)){
            data = Object.values(data);
        }

        this.data = this.data.filter(function (obj) {
            return data.includes(obj[field]);
        });
        return this;
    }

    whereNotIn(field, data){

        if(!Array.isArray(data)){
            data = Object.values(data);
        }

        this.data = this.data.filter(function (obj) {
            return !data.includes(obj[field]);
        });
        return this;
    }

    rawFilter(callback){
        this.data = this.data.filter(callback);
        return this;
    }

    getColumn(field){
        let rv = [];
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        rData.forEach(function (item) {
            if(item.hasOwnProperty(field)){
                let a = {};
                a[field] = item[field];
                rv.push(a);
            }
        });
        this.data = rv;
        return this;
    }

    unique(field){
        let tmp = [];
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        this.data = rData.filter(function (item) {
            if(item.hasOwnProperty(field)){
                if(!tmp.includes(item[field])){
                    tmp.push(item[field]);
                    return true;
                }
            }
            return false;
        });
        return this;
    }

    orderBy(field, sortType){
        sortType = sortType.toLowerCase();
        if(sortType === 'asc' || sortType === "0"){
            sortType = 1;
        }
        else{
            sortType = -1;
        }
        this.data = this.data.sort(function(a, b){
            let result = (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0;
            return result * sortType;
        });
        return this;
    }

    groupBy(field){
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        let tmp = [];
        rData.forEach(function (val) {
            if(!Array.isArray(tmp[val[field]])){
                tmp[val[field]] = [];
            }
            tmp[val[field]].push(val);
        });
        this.data = tmp;
        return this;
    }

    // GET METHODS
    count(){
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rData.length;
    }

    sum(field){
        let x = 0;
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        rData.forEach(element => {
            if(element.hasOwnProperty(field)){
                x += parseFloat(element[field]);
            }
        });
        return x;
    }

    flatten(){
        let that = this;
        let rv = [];
        let rData = _availableSelfData(this.data);
        rData.forEach(function (items) {
            Object.values(items).forEach(function (item) {
                if(dc_isObject(item) || dc_isArray(item)){
                    let c =  dc_isObject(item) ? new dcollect([item]) : new dcollect(item);
                    rv = rv.concat(c.query().flatten());
                }
                else{
                    rv.push(item);
                }
            });

        });
        return rv;
    }

    eq(index){
        return this.data[index];
    }

    first(){
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rData[0];
    }

    last(){
        let rData = _availableSelfData(this.data);//Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rData[rData.length - 1];
    }

    find(id){
        return this.where("id", "=", id);
    }

    get(){
        return this.data;
    }

    all(){
        return this.get();
    }
}

module.exports = dcollect;