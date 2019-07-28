module.exports = function ({onInit, onSave}) {
    let data = onInit();
    let timer = null;
    let synchronized = true;

    // Register exit hook
    for (let event of ['exit', 'SIGINT', 'SIGTERM'])
        process.once(event, () => {
            if (!synchronized)
                onSave(data, true)
        });

    // Register a data changes handler
    let handler = {
        get(target, key) {
            if (typeof target[key] === 'object' && target[key] !== null) {
                return new Proxy(target[key], handler);
            } else {
                return target[key];
            }
        },
        set(target, key, value) {
            target[key] = value;
            synchronized = false;
            if (timer == null)
                timer = setTimeout(async () => {
                    try {
                        await onSave(data);
                    } finally {
                        timer = null;
                        synchronized = false;
                    }
                });

            return true;
        }
    };

    return new Proxy(data, handler);
};
