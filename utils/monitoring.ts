/**
 * Telemetry Service - Façade pour le monitoring de production (Sentry, LogRocket, etc.)
 * Permet d'isoler la logique de log du code métier.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

interface EventContext {
  [key: string]: any;
}

class TelemetryService {
  private isProduction = true; // Simulé

  /**
   * Capture une exception avec son stack trace et un contexte supplémentaire
   */
  public captureException(error: Error, context: EventContext = {}) {
    if (!this.isProduction) {
      console.error('[Telemetry Exception]', error, context);
      return;
    }

    // Ici : intégration réelle (ex: Sentry.captureException(error, { extra: context }))
    console.debug('%c[Monitoring-Error]', 'color: #ff0000; font-weight: bold;', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log un événement utilisateur ou système (Analytics/Audit Trail)
   */
  public trackEvent(name: string, properties: EventContext = {}) {
    if (!this.isProduction) {
      console.log(`[Telemetry Event: ${name}]`, properties);
      return;
    }

    // Ici : intégration réelle (ex: mixpanel.track(name, properties))
    console.debug('%c[Monitoring-Event]', 'color: #0088ff; font-weight: bold;', {
      event: name,
      properties,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log un message simple avec un niveau de sévérité
   */
  public captureMessage(message: string, level: LogLevel = 'info', context: EventContext = {}) {
    console.debug(`%c[Monitoring-${level.toUpperCase()}]`, 'color: #ffaa00;', {
      message,
      context,
      timestamp: new Date().toISOString()
    });
  }
}

export const monitoring = new TelemetryService();
