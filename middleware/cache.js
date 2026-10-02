let cache = {};

function cacheMiddleware(req, res, next) {
    if (req.method === 'GET') {
        const key = req.originalUrl;
        const cached = cache[key];
        
        if (cached && (Date.now() - cached.createdAt <= 60000)) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cached.data);
        }

        res.setHeader('X-Cache', 'MISS');
        
        const originalJson = res.json;
        res.json = function(body) {
            cache[key] = {
                data: body,
                createdAt: Date.now()
            };
            return originalJson.call(this, body);
        };
        
        return next();
    }
    
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        res.on('finish', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache = {};
            }
        });
        return next();
    }
    
    next();
}

module.exports = cacheMiddleware;
