export function type_check_v1(data, type) {
    switch(typeof data) {
        case "number":
        case "string":
        case "boolean":
        case "undefined":
        case "function":
            return type === typeof data;
        case "object":
            switch(type) {
                case "null":
                    return data === null;
                case "array":
                    return Array.isArray(data);
                default:
                    return data !== null && !Array.isArray(data);
            }

    }
    
    return false;
}

export function type_check_v2(data, conf) {
    for (let key of Object.keys(conf)) {
        switch (key) {
            case 'type':
                if (!type_check_v1(data, conf[key])) return false;
                break;
            case 'value':
                if (JSON.stringify(data) !== JSON.stringify(conf[key])) return false;
                break;
            case 'enum':
                let valid = false;
                for (let value of conf[key]) {
                    valid = type_check_v2(data, {value});
                    if (valid) break;
                }
                if(!valid) return false;
        }
    }

    return true;
}