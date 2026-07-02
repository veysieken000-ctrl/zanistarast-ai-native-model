/**
 * Yek Identity Checker
 * ZANISTARAST AI Native Model
 *
 * Yek checks distinguishable created uniqueness.
 * Ehad is not modeled here.
 */

class YekChecker {

    check(entity) {

        if (!entity) {
            return false;
        }

        const hasIdentity =
            typeof entity.identity === "string" &&
            entity.identity.trim().length > 0;

        const hasTrace =
            Array.isArray(entity.trace) &&
            entity.trace.length > 0;

        return hasIdentity && hasTrace;
    }

    compare(entityA, entityB) {

        if (!this.check(entityA) || !this.check(entityB)) {
            return false;
        }

        return entityA.identity !== entityB.identity;
    }

    validateCollection(entities) {

        if (!Array.isArray(entities)) {
            return false;
        }

        const identities = new Set();

        for (const entity of entities) {

            if (!this.check(entity)) {
                return false;
            }

            if (identities.has(entity.identity)) {
                return false;
            }

            identities.add(entity.identity);
        }

        return true;
    }
}

module.exports =
    new YekChecker();



