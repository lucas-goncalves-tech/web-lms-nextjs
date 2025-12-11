/**
 * Formata segundos em horas e minutos (ex: "2h 30min", "45min")
 * Uso: Dashboard, CourseCard, CourseHeader
 */
export function formatHoursMinutes(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  }
  return `${minutes}min`;
}

/**
 * Formata segundos em minutos:segundos (ex: "8:30", "12:00")
 * Uso: LessonItem, video player
 */
export function formatMinutesSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
