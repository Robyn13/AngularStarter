
export class CopyObject {
    copy(object: any, newObject: any) {
        if (!!!object || !!!newObject) {
            return newObject;
        }
        if (typeof newObject !== 'object') {
            return object;
        }

        const keys = Object.keys(object);
        if (!!!keys){
            return newObject;
        }
        keys.forEach(key => {
            newObject[key] = object[key];
        });
        return newObject;
    }
}

export class ReturnObject extends CopyObject {
    register<T> (ctor: {new(): T }, object: T): T{
        const newObject = new ctor();
        return this.copy(object, newObject);
    }
}