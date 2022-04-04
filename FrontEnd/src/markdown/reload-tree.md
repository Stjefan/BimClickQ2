# ReloadTree

### Intuition:
Durchlaufe den Baum und lade die Daten neu, die bisher vorhanden sind.

### Allgemein:
Die bisherige ReloadTree-Methode durchläuft den Baum rekursiv und lädt in jedem Schritt dessen Kindknoten, falls sie denn bereits geladen wurden. Da in jedem Schritt gewartet wird, bis die Kinder geladen wurden (serielle Abarbeitung), kann dies viel Zeit in Anspruch nehmen: Wenn es 10 Knoten mit geladenen Kindknoten gibt, muss 10-mal nacheinander der Server angefragt und dessen Antwort abgewartet werden.

Die optimierte ReloadTree-Methode versucht, den Baum in einem Schritt zu laden. Deshalb wird zuerst der Baum durchlaufen und die Ids der Knoten in ein Array geschrieben (lineare Datenstruktur). Nun wird dieses Array ans Backend gesendet und man erhält die entsprechenden Knoten zurück (wieder als Array). Nun wird versucht den Baum wieder aufzubauen. Sollte es keine strukturellen Änderungen am Baum gegeben haben (d.h. keine Zweige sind beispielsweise durch Löschen verloren gegangen oder es wurden keine Zweige verschoben), kann man sich am vorhandenen Baum orientieren und den Baum rekonstruieren.
Problematisch sind strukturelle Änderungen, da nun nicht mehr klar ist, wo manche geladenen Knoten eigentlich hingehören (da das Backend nur eine Liste der Knoten lädt und keine Kenntnis der aktuellen, echten, in der Datenbank gespeicherten Baumstruktur hat). Ein Beispiel für einen Fehler wäre, wenn ein Kindknoten geladen wird, der inzwischen einen anderen Elternknoten hat. Dann wird er trotzdem unter dem alten Elternknoten eingehängt.
Der bisherige, nicht optimierte Reload löst das Problem, indem er schaut, ob der aktuell betrachte Knoten bereits vor dem Reload vorhanden war. Wenn dies nicht der Fall war, fügt er ihn einfach hinzu, macht aber nichts mit ihm. Eine andere Sichtweise ist, dass der Baum einfach durch das "GetChildren", das beim alten Reload aufgerufen wird, immer im aktuellen, echten, in der Datenbank gespeicherten Zustand geladen wird. Durch die Durchlaufmethodik, dass zuerst immer das Parent geladen wird, kann es auch nicht vorkommen, dass ein Kindknoten geladen wird, dessen Parent bisher gar nicht geladen wurde (z.B. nach Verschieben des Kindknoten durch einen anderen Nutzer)


Detail-Probleme:
- Setzen des Lazy-Flags: Lösung über ein Dictionary, das für jeden vorhandenen Knoten eingetragen hat, ob er lazy geladen wurde. Dies funktioniert dann auch unabhängig von der
  Struktur des Baums.
- Hinzufügen neuer Knoten: Da man weiß, wie sich die vorhandene Baumstruktur beim Hinzufügen ändert, kann man diese
  strukturelle Änderungen am Baum beim Laden berücksichtigen. Dafür wurde das folgende entwickelt:
- [Arbeit der letzten Tage] Erstellung einer Darstellung des Baums als Liste oder String, aus der sich die Quasar-Struktur wiederherstellen lässt. Zusätzlich sollen sich leicht Knoten zu dieser als Kinder bestimmter anderer Knoten hinzufügen (oder löschen) lassen. Der bisherige, optimierte Reload nutzte dazu eine sehr komplexe, inpraktikable Struktur. Damit kann das Hinzufügen von Knoten nicht so leicht durchgeführt werden.

Beispiel 1:
	let treeExample = {_id: 1, children: [{_id: 1a}, {_id: 1b, children: [{_id: 1b1}], {_id: 1c}}]}
	entspricht
	<1><1a>|<1b><1b1>||<1c>||
Beschreibung:
<> enthält die _id eines Knotens. Folgt direkt nach einem Knoten \<a\> ein weiterer Knoten \<b\>, dann bedeutet dies, dass \<b\> ein Kind von \<a\> ist.
Folgt nach einem Knoten \<a\> ein "|", bedeutet das, dass die Aufzählung der Kinder von \<a\> abgeschlossen ist, also \<a\> keine Kinder hat. Darauffolgende Knoten sind dann Kinder des Elternknotens von \<a\>, d.h. Geschwister von \<a\>.

Beispiel 2:
\<a\>\<b\>|\<c\>\<d\>|||
In diesem Beispiel hat Knoten \<a\> zwei Kinder: \<b\> und \<c\> und Knoten \<c\> hat noch ein Kind \<d\>. Das | hinter \<d\> bedeutet, dass \<d\> keine Kinder hat, das zweite | \<d\> beendet die Aufzählung der Kinder von \<c\> und das dritte die Aufzählung der Kinder von \<b\>


### Hinweise zur Verwendung:
Aus den obigen Ausführungen ergibt sich, dass bei Veränderungen von Baueigenschaftswerten (z.B. Profilaktivierung, Ausfüllen eines Profilformulars) der verbesserte, optimierte Reload verwendet werden kann. Bei strukturellen Änderungen (z.B. Verschieben von Knoten) muss der nicht-optimierte Reload verwendet werden. 
Beim Hinzufügen von Knoten ergibt sich ein Sonderfall: Bisher ist das Hinzufügen ohne Profilaktivierung so implementiert, dass es gar keinen Reload gibt (, weil es dadurch keine Veränderungen nach oben im Pfad geben kann). Die Create-Methode gibt den neuangelegten Knoten zurück. Dieser wird am Frontend in den Baum eingefügt. Beim Hinzufügen mit Profilaktivierung muss allerdings ein Refresh erfolgen. Eigentlich könnte man nun so vorgehen, dass man den Knoten per Hand (wie bei der anderen Create-Methode) am Frontend hinzufügt und anschließend den optimierten-Reload durchführt. Leider führt das z.B. beim Bodenaufbau zu Problemen (wegen schlechter Programmierung des Bodenaufbaus). Bei den anderen Profilen wird dieses Vorgehen allerdings erfolgreich eingesetzt.

### Ausblick:
Eine dritte Variante ist, den bisherigen nicht-optimierten Reload als einen Request ablaufen zu lassen, d.h. man erstellt eine Backend-Anfrage die für alle vorhandenen Knoten, bei denen die Kindknoten geladen sind, deren Kindknoten abfragt. Dies behebt das Hauptproblem, dass es viele Roundtrips zwischen Frontend und Backend beim Reload gibt (d.h. es gibt nur eine "große" Anfrage) und sollte genauso stabil laufen wie der bisherige Reload "Nicht-Optimiert"

### Bemerkung:
Der optimierte Reload-Methode besteht eigentlich noch aus einem zweiten Schritt, der unabhängig vom ersten ist. Er wurde in dieser Darstellung erstmal ausgelassen, da er für Logik des verbesserten Reloads unerheblich ist, da das Hauptziels dieses Texts die Erklärung des Wiederherstellens einer Baumstruktur ist.
In diesem zweiten Schritt wird der Pfad oberhalb eines Knotens (einschließlich des aktuellen Knotens) geladen. Dies bedeutet, dass alle Knoten, die auf dem Pfad liegen (d.h. Parent-Node, Grand-Parent-Node etc.) werden neugeladen und ersetzen im Baum ihren entsprechenden alten Stand. Die Begründung, dass genau diese Knoten geladen werden, liegt darin, dass nur diese sich durch Baueigenschaftsvererbungsoperationen verändern können, wenn es eine Baueigenschaftsvererbungsaktion an einem Knoten gibt.
