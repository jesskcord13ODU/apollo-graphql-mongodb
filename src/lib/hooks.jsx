import React, { useEffect, useMemo } from 'react';


export const useIterable = obj => {
    const [iterObj, setIterObj] = useState(obj);

    const iterable = obj => {
        this.obj = obj;
    }

    iterable.prototype[Symbol.iterator] = function* () {
        if (this.obj.construcutor === "object") {
            for (const ele in this.obj) {
                yield [ele, this.obj[ele]];
            }
        } else {
            for (const ele in this.obj) {
                yield ele;
            }
        }
    }

    useEffect(() => {
        const iter = new iterable(obj);
        setIterObj(iter);
    }, [obj]);

    return iterObj;
}