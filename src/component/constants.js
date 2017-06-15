//constants.js

/**
 *   init -> pulling -> ready -> refreshing -> refreshed -> resetAfterRefreshed
 *
 *   init -> pulling -> reset
 *
 *   init -> pulling <=> ready
 *
 *   refreshing -> refreshed -> resetAfterRefreshed
 */

export const PULLDOWN_STATS = {
    init: '',
    pulling: 'pulling',
    ready: 'ready-refresh',
    refreshing: 'refreshing',
    refreshed: 'refreshed',
    reset: 'reset',
    resetAfterRefreshed: 'reset-afterR'
};