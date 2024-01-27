import {ACTIONS, AuditLog} from ".prisma/client";

export const generateLogsMessage = (logs: AuditLog) => {
    const {actions, entityTitle, entityType} = logs;

    switch (actions) {
        case ACTIONS.CREATE:
            return `created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTIONS.UPDATE:
            return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTIONS.DELETE:
            return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        default:
            return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
    }
}