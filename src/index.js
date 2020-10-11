function dc_log(...a) {
    console.log(...a);
}
function dc_error(...a) {
    console.error(...a);
}

class dcollect{

    constructor(data){
        this.data = data;
    }

    query(){
        if(Array.isArray(this.data)){
            return new _builder(Array.from(this.data));
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
        let rDara = Array.isArray(this.data) ? this.data : Object.values(this.data);
        let tmp = [];
        rDara.forEach(function (val) {
            if(!Array.isArray(tmp[val[field]])){
                tmp[val[field]] = [];
            }
            tmp[val[field]].push(val);
        });
        this.data = tmp;
        return this;
    }

    count(){
        let rDara = Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rDara.length;
    }

    sum(field){
        let x = 0;
        let rDara = Array.isArray(this.data) ? this.data : Object.values(this.data);
        rDara.forEach(element => {
            if(element.hasOwnProperty(field)){
                x += parseFloat(element[field]);
            }
        });
        return x;
    }

    eq(index){
        return this.data[index];
    }

    first(){
        let rDara = Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rDara[0];
    }

    last(){
        let rDara = Array.isArray(this.data) ? this.data : Object.values(this.data);
        return rDara[rDara.length - 1];
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