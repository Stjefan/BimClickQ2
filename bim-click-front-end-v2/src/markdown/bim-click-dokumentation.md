<!--------------------------------------------------------------------------------------------------------------------------->
<!-- BIM.click Dokumentation im Markdown-Format -->
<!-- Benutzt Quasar Markdown App Extension -->
<!-- Installation: bimclickfrontend> quasar ext add @quasar/qmarkdown -->
<!-- Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs -->
<!-- Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/examples -->
<!--------------------------------------------------------------------------------------------------------------------------->
<!-- HINWEISE: -->
<!-- 1- Nummerierung der Überschriften beginnt mit 2, da Kapitel 1 in Quasar/HTML in Dokumentation.vue maintained wird -->
<!-- 2. Quasar und Vue Komponenten können NICHT embedded werden in den Markdown -->
<!--    Wenn man solche verwenden will, muss man den Markdown aufsplitten und die aufgesplitteten Teile in das Vue-Template von Dokumentation.vue einbetten,  -->
<!--    vermischt mit Quasar bzw. Vue Komponenten. Links im Markdown müsssen als Markdown Links definiert werden, siehe dazu die Markdown Doku.-->
<!-- 3. HTML-Tags können in den Markdown eingebettet werden, z.B. <em>kursiv</em>, <ins>unterstrichen</ins>-->
<!-- 4. DOM-Element-Ids für die in einem <q-markdown> mit #, ##, usw. erzeugten Headings h1, h2, usw. werden von QMarkdown automatisch erzeugt -  -->
<!--    auch ohne "toc" Property am <q-markdown> -->
<!-- 5. Zusätzlich liesse sich mit der Properties "toc" in Verbindung mit @data="onToc" und der Methode this.toc = this.$refs.markdown.makeTree(toc) -->
<!--    ein passendes Inhaltsverzeichnis in hierarchischem Format (gleich wie Dokumentationsverzeichnis.js, aber ohne icon Felder!) -->
<!--    generieren, per QMarkdown API Methode makeTree, im sluggified Format für die Heading ids (id: "Heading-1-Text") -->
<!--    Problem dabei: Bei Verwendung von makeTree zur Generierung eines hierarchischen ToCs kam immer folgender Fehler im Browser Log: -->
<!--                   [Vue warn]: Error in v-on handler: "TypeError: Cannot read property 'makeTree' of undefined" kommt immer noch!!! -->
<!--    Dieses Problem trat auf, obwohl ansonsten die am <q-markdown> generierten ids für die Headings einwandfrei funktionierten!!! -->
<!--    Workaround: Code umgestellt in Dokumentation.vue auf nicht hierarchisches ToC - das hierarchische wird sowieso nicht direkt verwendet, -->
<!--    weil BIM.click zusätzlich Felder für Icons im Dokumentationsverzeichnis benötigt -->
<!--    und daher sein eigenes Dokumentationsverzeichnis (allerdings mit den durch QMarkdown generierten ids) verwendet -->
<!--    Später @data="onToc" ganz abgestellt, da das ToC (egal ob hierarchisch oder nicht) selbst einstweilen nicht gebraucht wird, nur die ids, die
<!--    aber durch obige "toc" Property erzeugt werden -->
<!--    HINWEIS: toc-start="2" wird nicht benötigt, da die für die Dokumentation gewählten Headings aus Eindeutigkeitsgründen die Nummer mit im Heading haben -->
<!--    DEFECT #259 im Dezember 2020: -->
<!--    Nach Update auf Quasar 1.14 und q-markdown 1.14 funktionierte das Scrollen aus dem Inhaltsverzeichnis auf die von q-markdown automatisch -->
<!--    generierten Ids nicht mehr - es gab einen Fehler in der Funktion scrollToElement(elementId) in dokumentation.vue: -->
<!--    Dort lieferte document.getElementById(elementId) plötzlich null zurück für diese Ids -->
<!--    Per Log wurden diese zwar weiterhin korrekt aus dem Inhaltsverzeichnis als Strings an obige Funktion übergeben, -->
<!--    aber offenbar waren sie durch q-markdown nicht mehr korrekt als DOM Ids registriert, warum auch immer! -->
<!--    HINWEIS: Ein Blick in das DOM mit Chrome zeigt, dass QMarkdown an den <h1>, <h2>, ... Tags durchaus sowohl ids als auch names generiert -->
<!--             Beispiel: <h2 id="2.2-beispiele-f%C3%BCr-baueigenschaften-mit-unterschiedlichen-wertetypen" -->
<!--                           name="2.2-beispiele-f%C3%BCr-baueigenschaften-mit-unterschiedlichen-wertetypen" -->
<!--                           class="q-markdown--heading q-markdown--heading-h2 q-markdown--heading--anchor-link" -->
<!--                        > -->
<!--    Daran erkennt man, dass Umlaute ersetzt werden mit %-Codes und ausschließlich KLEINE Buchstaben verwendet werden!-->
<!--    Dies könnte die Ursache der Probleme sein, da im Inhaltsverzeichnis bisher Großbuchstaben verwendet wurden!!! -->
<!--    Allerdings gibt es noch ein zweites Problem, dass das Scrollen per bisherigem Offset nicht mehr an die richtigen Stellen scrollt, sondern -->
<!--    nicht diese erscheinen meist ganz unten auf der Seite nach dem Scrollen -->
<!--    Auch das Setzen der Property toc an q-markdown bewirkt keine Änderung! -->
<!--    Diese beiden Probleme folgendermaßen umgangen: -->
<!--    a) Hier ÜBERALL (d.h. nicht nur für Überschriften mit Umlauten etc.) in den Markdown manuell Sprungziele eingefügt nach jeder Überschrift gemäß 6. -->
<!--    b) Modifikation des Scrollens selbst in der obigen Funktion, +window.innerHeight hinzugefügt, weil sonst nicht weit genug gescrollt wird, -->
<!--    allerdings nur für die Sprungziele innerhalb des Markdowns, die dafür eigens "extrahiert" werden müssen aus der elementId! -->
<!-- 6. ACHTUNG: Die Überschriften, für die QMarkdown automatisch ToC ids generiert, dürfen NICHT enthalten: -->
<!--    Umlaute, Fragezeichen, Klammern - sonst funktionieren die aus den ids erzeugten Routes NICHT, und es kommt zu Fehlern, meist "Cannot read -->
<!--    property 'closest' of null" -->
<!--    Erlaubt sind dagegen: ".", ":", ",", "-" -->
<!--    Dafür müssen mit <div> bzw. besser <a> (siehe 5.) manuell Sprungziele in den Markup und in die Heading-Tags in dokumentationsVerzeichnis.js eingefügt <!--    werden, die diese Zeichen nicht enthalten!  -->
<!--    UPDATE Dezember 2020: Statt <div> sollte besser <a>-Tag verwendet werden, weil divs den Markdown durcheinander bringen können! -->
<!--    Quelle: https://stackoverflow.com/questions/3292903/in-markdown-what-is-the-best-way-to-link-to-a-fragment-of-a-page-i-e-some-id -->
<!-- 7. Zusätzliche Sprungziele können per <div id="Sprungziel-1"> in den Markup eingefügt werden -->
<!--    UPDATE Dezember 2020: Statt <div> sollte besser <a>-Tag verwendet werden, weil divs den Markdown durcheinander bringen können! -->
<!--    Quelle: https://stackoverflow.com/questions/3292903/in-markdown-what-is-the-best-way-to-link-to-a-fragment-of-a-page-i-e-some-id -->
<!-- 8. Eventuell im Markup &nbsp; verwenden, um Leerzeichen zu erwzingen -->
<!-- 9. Scrolling zu lokalen DOM-Elementen macht Probleme -->
<!--    Lokaler Link im Markdown z.B. [Sprung nach Dokumentationabschnitt 2 Baueigenschaften](/Dokumentation/2-Baueigenschaften) - lädt die Seite neu! und scrolled dann mittels -->
<!--    mounted: Code von Dokumentation zu der Destination. -->
<!--    Scrollen mit Quasar- und Vue-Mitteln funktioniert, <q-btn to="9-Glossar"> macht ein soft Scrolling zu einem Ziel im Markup ohne Reloading! -->
<!--    Leider kann ein solcher Button nicht direkt eingebettet werden in den Markup, sondern es müssten dann umgekehrt mehrere <q-markup> eingebettet werden  -->
<!--    in ein Quasar Template mit <q-btn> und anderen Quasar Komponenten, was wenig Sinn macht -->
<!--    Siehe Abschnitt "10.2 Links" in Dokumentation zum Testen -->
<!--    Diskussion auf https://forum.quasar-framework.org/topic/5012/qmarkdown-extension-how-to-link-and-scroll-within-the-markup-without-reloading-page/8 ->
<!--    Anchor-Support in QMarkdwon 1.0.11 - unklar, wie zu verwenden -->
<!--    Alternative: Vue Markdown, https://www.npmjs.com/package/vue-markdown bzw. https://github.com/miaolz123/vue-markdown - erlaubt Vermischung von Vue/Quaar -->
<!--    mit Markdown -->
<!-- -->
<!--------------------------------------------------------------------------------------------------------------------------->

<!--------------------------------------------------------------------------------------------------------------------------->
<!-- Test-Sprungziele für Scrolling innerhalb Markdown -->
<!-- Aktuell disabled -->
<!--
---

==Hinweis: Unterhalb dieser Position sind Test-Sprungziele für Scrolling-Tests definiert - nicht entfernen!==
-->
<!-- ALT: Als "normale" DOM-Ids mit <div id="xyz"> -->
<!--
- <div id="destination1">Test-Sprungziel 1, mit div-Tag und id='destination1' definiert</div>
-->
  <!-- Diese Variante FUNKTIONIERT mit Ansprung aus Dokumentationsverzeichnis mit einer solchen id als Sprungziel -- dort wird allerdings per Quasar-Code gesprungen !!! -->
  <!-- Wenn dieses Sprungziel mit seiner id aus dem Markup angesprungen wird, per <a href="destination1" > -->
  <!-- oder per internem Markdown Link [Linktext](Dokumentation/destination1), funktionierte es so ursprünglich NUR mit unerwünschtem Reload der App/Page!!!-->
  <!-- URL Wird im Browser Addressfeld angezeigt als localhost:4200:/Dokumentation/destination1 !!! -->

  <!-- NEU: Mit Anchor-Link Support in neuer Version von QMarkup, siehe http://www.echoecho.com/htmllinks08.htm -->
<!--
- <a name="anchor1">Anker-Sprungziel, mit a-Tag und "name='anchor1' definiert</a>

==Hinweis: Oberhalb dieser Position sind Test-Sprungziele für Scrolling-Tests definiert - nicht entfernen!==
-->
  <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------->
  <!-- Test für Scrolling mit JS, ohne Quasar, nach https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery  -->
  <!--
  <script>
  function scroll() {
   const id="#testSprungziel";
   const yourElement = document.getElementById(id);
   const y = yourElement.getBoundingClientRect().top + window.pageYOffset;
   window.scrollTo({top: y, behavior: 'smooth'});
  }
  </script>
  -->
  <!-- Javascript-Code für smoothes Scrollen nach internen Sprungzielen im Markdown mittels interner Links -->
  <!-- https://forum.quasar-framework.org/topic/5012/qmarkdown-extension-how-to-link-and-scroll-within-the-markup-without-reloading-page/7 -->
  <!--
  <script>
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          console.log("Markup-interne Scroll-Funktion aufgerufen");
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  </script>
  -->

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------->
---
<!-- NEU: FAQ hier provisorisch eingefügt (gehört eigentlich zu Kapitel 1, erfordert aber Markdown) -->
<!-- FAQs für Objection Management -->
::: info BIM.<em>click</em> FAQs

- Wieso ein weiteres BIM-Werkzeug? Kann ich die in BIM.<em>click</em> verwalteten Daten nicht einfach mit <b>Microsoft Excel</b> verwalten?
  - Excel ist zwar ein hervorragendes und weit verbreitetes Hilfswerkzeug, es weist allerdings <b>Restriktionen</b> auf, die es insgesamt als BIM-Hauptwerkzeug ungeeignet machen
  - Excel erlaubt keine <b>übergreifende und integrierte Verwaltung</b> einer großen Zahl von Bauvorhaben, Baustoffen, Bauinformationen und Baueigenschaften wie BIM.<em>click</em>
  - Excel hat kein intelligentes <b>Datenmodell</b> wie BIM.<em>click</em>, welches es erlaubt, Beziehungen zwischen Objekten (z.B. Schichten in einem 
    Bodenaufbau zu zugeordneten Baustoffen) oder die Vererbung von Eigenschaften zu verwalten (um z.B. selektiv bestimmte Anforderungen an Bauteile
    weiterzugeben)
  - Excel hat nur eingeschränkte Unterstützung für die in BIM-Modellen benötigten <b>Datentypen</b> (z.B. kann man eine Dropdown-Liste, was einem 
    Aufzählungswert in BIM.<em>click</em> entspricht, nur für eine ganze Spalte definieren, nicht individuell für jede einzelne Zelle)
  - Excel arbeitet nicht auf einer integrierten <b>Datenbank</b> wie BIM.<em>click</em>, sondern auf Dateien, die zwischen den Beteiligten 
    ausgetauscht werden müssen, wodurch
    die Integrität der Daten insbesondere in größeren Projekten rasch außer Kontrolle gerät
  - BIM.click bietet darüber hinaus die Möglichkeit, Daten aus Excel zu <b>importieren</b> und Daten nach Excel zu <b>exportieren</b>, so dass 
    Sie BIM.click zusammen mit Excel einsetzen können
<br />
<br />
- Wieso ein weiteres BIM-Werkzeug? Kann ich die in BIM.<em>click</em> verwalteten Daten nicht gleich in einem <b>CAD-Programm</b> verwalten (z.B. Autodesk® Revit oder Graphisoft® Archicad) und damit eine "single Source of Truth" erreichen?
  - Diese CAD-Programme weisen ebenfalls eine Reihe von <b>Restriktionen</b> auf, wodurch sie als BIM-Hauptwerkzeug für übergreifende
    Fachplanungen nur sehr eingeschränkt nutzbar sind
  - Sie sind sehr leistungsfähig für die <b>geometrische</b> Modellierung von Gebäuden
  - Allerdings ist die damit verbundene zeitaufwändige Notwendigkeit der Erstellung eines geometrischen
    Modells in den frühen Leistungsphasen ein <b>Hinderungsgrund</b> für eine proaktive Planung der Anforderungen und der daraus resultierenden Zielvorgaben an das Bauvorhaben und die zu planenden Gebäude
  - Diese CAD-Programme unterstützen nicht das von BIM.<em>click</em> unterstützte breite Spektrum an fachlichen <b>Unterdisziplinen</b>
  - Sie kennen wichtige <b>Möglichkeiten</b> nicht, die BIM.<em>click</em> bietet, wie zum Beispiel standortbezogene Regelwerke, eine
    alternative Planung mit verschiedenen Normen, oder die Unterscheidung von Soll- und Istwerten
  - Sie haben kein intelligentes <b>Datenmodell</b> wie BIM.<em>click</em>, welches es erlaubt, die Vererbung von Eigenschaften zu verwalten, um z.B. bestimmte 
    Anforderungen aus Standortcharakteristiken oder Raumnutzungen selektiv an die betroffenen Bauteile weiterzugeben
  - Sie arbeiten wie Excel nicht auf einer integrierten <b>Datenbank</b> wie BIM.<em>click</em>, sondern auf Dateien, die zwischen den Beteiligten ausgetauscht werden müssen. Zur
    Synchronisation solcher Dateien müssen vielfach Erweiterungen installiert und bedient werden.
  - BIM.click bietet darüber hinaus die Möglichkeit, Daten aus diesen Werkzeugen zu <b>importieren</b> und Daten in diese Werkzeuge zu <b>exportieren,</b> so dass 
    Sie BIM.click zusammen mit diesen Werkzeugen einsetzen können
<br />
<br />
- Wieso ein weiteres BIM-Werkzeug? Wodurch entscheidet sich BIM.<em>click</em> denn von den vielen anderen <b>BIM-Werkzeugen</b> und <b>BIM-Plattformen</b> am Markt?
  - BIM.<em>click</em> unterstützt ein breites Spektrum an fachlichen <b>Unterdisziplinen</b>, die als fachliche Kategorien und Rubriken strukturiert sind.
  - BIM.<em>click</em> reicht damit weit über spezialisierte Fachwerkzeuge hinaus und erlaubt eine <b>integrierte, funktionsübergreifende Planung.</b>
  - BIM.<em>click</em> geht die <b>Digitalisierung auf einem neuen Niveau</b> an, nämlich die digitale Umsetzung von <b>Regelwerken</b> und <b>Expertenwissen</b>.
  - Zum einen erfolgt diese Planungsunterstützung <b>frühzeitig im Planungszyklus</b> und ist daher <b>proaktiv wirksam</b>.
  - Zum anderen findet sie auf einer detaillierten und wo erforderlich <b>feingranularen technischen Ebene</b> statt.
  - Die <b>"digitale Währung",</b> in der BIM.<em>click</em> planerische Unterstützung bietet, beruht auf einem <b>intelligenten Datenmodell</b>:
    - Baustoffe, Bauvorhaben/Baueinheiten/Bauteile und Bauinformationen können dort miteinander verknüpft und durch regelkonforme technische Attribute beschrieben, 
      verglichen und verfeinert werden.
    - <b>Fortgeschrittene Konzepte</b> wie Baumstrukturen, Vererbung und dynamische Erweiterbarkeit sind auf diese planerischen Anforderungen zugeschnitten.
:::

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="2-Bauvorhaben"/>

# 2 Bauvorhaben

<!--------------------------------------------------------------------------------------------------------------------------->
## 2.1 Überblick zu Bauvorhaben
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="2.1-Ueberblick"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumentation.md! -->
<a id="2-1-Ueberblick"/>

**`Bauvorhaben`** sind der Hauptgegenstand der baulichen Planung und werden im **Bauvorhabenbaum** verwaltet. 

Die Teileinheiten von Bauvorhaben werden als **`Baueinheiten`** bezeichnet. 

Der Bauvorhabenbaum kann beliebig viele Baueinheiten als verschachtelte Strukturen enthalten. Jede Baueinheit kann wiederum aus beliebig vielen, verschachtelten Baueinheiten aufgebaut sein.

:::
**`Bauprojekte`** sind spezielle **`Baueinheiten`**, die zur Darstellung ganzer Bauprojekte im **Bauvorhabenbaum** dienen.

Dementsprechend sind Bauprojekte ebenfalls aus beliebig vielen, ihrerseits verschachtelten Baueinheiten aufgebaut.

Es ist auch möglich, verschiedene Bauprojekte unter gemeinsamen Elternknoten im Bauvorhabenbaum zu gruppieren, um eine bessere Strukturierung und Ordnung im Bauvorhabenbaum zu erreichen.

:::
**`Vorlagen für Baueinheiten`** sind spezielle, von Redakteuren vordefinierte **`Baueinheiten`**, die in Bauvorhaben als Muster für Baueinheiten verwendet werden können.

Sie sind aus beliebig vielen, verschachtelten Baueinheiten aufgebaut. Sie werden in einem entsprechend gekennzeichneten **Unterbaum für Bauvorlagen** des Baustoffbaums verwaltet. 

Die Verwendung einer Vorlage für eine Baueinheit erfolgt, indem sie zunächst im Unterbaum für Bauvorlagen **markiert** wird (per Kontextmenü) und anschließend unter eine Baueinheit in einem Bauprojekt **kopiert** wird (ebenfalls per Kontextmenü).

:::
Jede Baueinheit ist also ein Knoten im Bauvorhabenbaum, zu dem bestimmte weitere Informationen im System verwaltet werden:
- **Angaben zur Baueinheit:** Dazu gehört die Bezeichnung der ausgewählten Baueinheit im Bauvorhabenbaum, bestimmte andere Angaben, die ihre Rolle als Knoten
  im Bauvorhabenbaum näher beschreiben, sowie der Baueinheit zugeordnete Autoren
- **Beschreibung:** Dies ist eine fachliche Beschreibung für das betreffende Bauvorhaben oder die betreffende Baueinheit. Diese wird für ein im Bauvorhabenbaum ausgewähltes Bauvorhaben oder eine ausgewählte Baueinheit auch in der fachlichen Hilfe angezeigt.
- **Fachliche Planung:** Hier werden **`Baueigenschaftsprofilformulare`** zur Anzeige und Bearbeitung von an der 
  Baueinheit aktivierten **`Baueigenschaftsprofilen`** zur Verfügung gestellt
- **Zugeordnete Baustoffe:** Das sind Verweise auf der im Bauvorhabenbaum ausgewählten Baueinheit zugeordnete **`Baustoffe`** sowie zusätzliche Informationen dazu (z.B. den Anteil des der Baueinheit zugeordneten Baustoffs in der betreffenden Baueinheit)
- **Zugeordnete Bauinformationen:** Das sind Verweise auf der im Bauvorhabenbaum ausgewählten Baueinheit zugeordnete **`Bauinformationen`** (Normen, Regelwerke, Vorschriften, Richtlinien, Zulassungen,
  Nachweise, Datenblätter und sonstige Informationen)
- **Baueigenschaften:** Das sind "Attributleisten“ aus **`Baueigenschaften`**,
  1. zu denen jederzeit zusätzliche Baueigenschaften **hinzugefügt** werden können
  2. die durch **Vererbung** im Bauvorhabenbaum von den Elternknoten an die direkten und indirekten Kindknoten weitergegeben werden
  3. in denen für jede Baueinheit bestimmte Baueigenschaften **aktiviert**, d.h. an der betreffenden Baueinheit als zutreffend ausgewählt werden können, bzw. **deaktiviert,**
     d.h. an der betreffenden Baueinheit (sowie ggf. ihre direkten und indirekten Kindknoten) als unzutreffend ausgewählt werden können
- **Baueigenschaftsprofile:** Damit können **`Baueigenschaften`** gemeinsam verwaltet und bei Bedarf an der betreffenden Baueinheit gemeinsam aktiviert weden
:::

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="2.2-Beispiele"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="2-2-Beispiele"/>

## 2.2 Beispiele

::: info Beispiele für Bauvorhaben und Baueinheiten
Dieser Abschnitt befindet sich im Aufbau. Wir bitten um etwas Geduld.
:::

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="2.3-Sonstiges"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="2-3-Sonstiges"/>

## 2.3 Sonstiges

Hierzu gehört das **Markieren** und **Verschieben** bzw. **Kopieren** von **Zweigen** (d.h. bestimmten Elternbaueinheiten
einschließlich ihrer direkten und indirekten Kindbaueinheiten, falls vorhanden) im Bauvorhabenbaum, welches mit **Kontextmenüs** auf Knoten im Baum erfolgt. Dabei wird zunächst der zu
verschiebende bzw. zu kopierende (d.h. zu bewegende) Zweig per Kontextmenü "Markierung am Zweig
setzen/entfernen für Verschieben/Kopieren" an seinem Wurzelknoten **markiert.** Anschließend wird mit
einem weiteren Kontextmenü "Markierten Zweig hierher verschieben" bzw. "Markierten Zweig hierher kopieren"
an einem Zielknoten (welcher als **Zielelternknoten des zu bewegenden Zweigs** bezeichnet wird) der
markierte Zweig unter diesen Zielelternknoten **verschoben** bzw. **kopiert.**

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="3-Baustoffe"/>

# 3 Baustoffe

---
<!--------------------------------------------------------------------------------------------------------------------------->
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="3.1-Ueberblick"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="3-1-Ueberblick"/>

## 3.1 Überblick zu Baustoffen

Alle in der Planung und beim Bau verwendeten Materialien werden als **`Baustoffe`** bezeichnet. 

**Baustoffe** werden im **Baustoffbaum** verwaltet. Der Baustoffbaum kann beliebig viele Baustoffe als verschachtelte Strukturen enthalten. Jeder Baustoff kann wiederum aus beliebig vielen, verschachtelten Baustoffen aufgebaut sein.

:::
**`Rohstoffe`** sind dabei spezielle **`Baustoffe`**, die in anderen Baustoffen als **zugeordnete Rohstoffe** enthalten sein können (siehe unten "**Zugeordnete Rohstoffe"**).

Dementsprechend sind Rohstoffe (analog zu Baustoffen) aus beliebig vielen, verschachtelten Rohstoffen aufgebaut.

Sie werden in einem entsprechend gekennzeichneten **Rohstoffunterbaum** des Baustoffbaums verwaltet.

:::

Im Baustoffbaum werden der Einfachheit halber 
- **Rohstoffe** (z.B. Sand oder Kies)
- **Kategorien von Baustoffen** (z.B. Bauplatten)
- **Bauarten** (z. B. Wandbauarten)
- **Bauelemente** (z.B. Fenster oder Türen)
- **Bauprodukte** (z.B. Gipskartonplatten bestimmter Hersteller)

alle als **Baustoffe** bezeichnet.

Jeder Baustoff ist ein Knoten im Baustoffbaum, zu dem bestimmte weitere Informationen im System verwaltet werden:
:::
- **Angaben zum Baustoff:** Dazu gehört die Bezeichnung des ausgewählten Baustoffs im Baustoffbaum sowie bestimmte andere Angaben, die seine Rolle als Knoten
  im Baustoffbaum näher beschreiben
- **Beschreibung:** Dies ist eine fachliche Beschreibung für den betreffenden Baustoff. Diese wird für einen im Baustoffbaum ausgewählten Baustoff auch in der fachlichen Hilfe angezeigt.
- **Zugeordnete Rohstoffe:** Das sind Verweise auf dem im Baustoffbaum ausgewählten Baustoff zugeordnete **`Rohstoffe`** sowie zusätzliche Informationen dazu (z.B. den Anteil des dem Baustoff zugeordneten Rohstoffs im betreffenden Baustoff)
- **Zugeordnete Bauinformationen:** Das sind Verweise auf für den im Baustoffbaum ausgewählten Baustoff zugeordnete **`Bauinformationen`** (Normen, Regelwerke, Vorschriften, Richtlinien, Zulassungen,
  Nachweise, Datenblätter und sonstige Informationen)
- **Baueigenschaften:** Das sind "Attributleisten“ aus **`Baueigenschaften`**,
  1. zu denen jederzeit zusätzliche Baueigenschaften **hinzugefügt** werden können
  2. die durch **Vererbung** im Baustoffbaum von den Elternknoten an die direkten und indirekten Kindknoten weitergegeben werden
  3. in denen für jeden Baustoff bestimmte Baueigenschaften **aktiviert**, d.h. am betreffenden Baustoff als zutreffend ausgewählt werden können, bzw. **deaktiviert,**
     d.h. an dem betreffenden Baustoff (sowie ggf. seine direkten und indirekten Kindknoten) als unzutreffend ausgewählt werden können
- **Baueigenschaftsprofile:** Damit können **`Baueigenschaften`** gemeinsam verwaltet und bei Bedarf an dem betreffenden Baustoff gemeinsam aktiviert weden
:::
---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="3.2-Gliederung"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="3-2-Gliederung"/>

## 3.2 Gliederung
::: info Inhaltliche Gliederung des Baustoffbaums
---
Die Gliederung des Baustoffbaums erfolgt stets vom **Generellen** zum **Speziellen**. Kindknoten im Baum repräsentieren demnach **Spezialisierungen** ihrer Elternknoten. Am Ende jedes Pfades vom **Wurzelknoten** des Baustoffbaums über generische Baustoffkategorien und deren Unterkategorien, die **Verzweigungsknoten** im Pfad sind, stehen konkrete **Bauprodukte** als **Blattknoten** im Baustoffbaum.

---
Die Baustoffe im Baustoffbaum sind primär gegliedert in Anlehnung an die Hauptkategorien nach **DIN 4108-4.** Es gibt aber eine sekundäre Gliederung nach der Kostengruppe 300 nach **DIN 276:2018-12,** da diese Zuordnung für die Attribuierung von BIM-Modellen erforderlich ist. Wegen der Gemeinsamkeit und Vererbbarkeit von Attributen, die als Baueigenschaften an den Baustoffen im Baustoffbaum verwaltet werden, ist die Gliederung wesentlich durch die **Herstellungsweise** bestimmt: 

1.	**Rohstoffe** stehen in der Gliederung ganz oben, denn diese können daraus produzierten Folgeprodukten, die als Baustoffe weiter unten im Baustoffbaum stehen, **zugeordnet** werden, um deren Zusammensetzung zu modellieren. Dabei können Anteile der Rohstoffe in solchen Folgeprodukten
verwaltet werden. In einer Ausbaustufe von BIM.click ist vorgesehen, dass bei dieser Zuordnung auch bestimmte Baueigenschaften der Rohstoffe (z.B. solche, die den 
Brandschutz oder den Schadstoffschutz betreffen) an die Folgeprodukte weitergegeben werden. 
---
Die weitere Unterscheidung erfolgt mit **Grundbaustoffen,** die mit Dickenangaben zu Bauteilschichten zusammengesetzt werden können:

2.	Baustoffe, die als formlose Massen auf die Baustelle geliefert werden (Silo-, Sack-, Eimer- und Kartuschenware), also **Beton, Estriche, Putze, Kleber, 
    Spachtelmassen, Beschichtungen.** Diese Gliederung erweitert die Rubriken „Putze, Mauermörtel, Estriche“ der DIN 4108 nach oben um die Betone und nach unten in Richtung Kleber und Spachtelmassen, weil hierdurch insbesondere die physikalischen und ökologischen Eigenschaften der Grundstoffe, aber auch Attribute wie Radioaktivität, Temperaturbeständigkeit oder Brennbarkeit der Grundstoffe vom Generellen zum Speziellen von oben nach unten vererbt werden können. 
---
Es folgen weitere **Grundbaustoffe,** die zu Bauteilschichten zusammengesetzt werden können:

3.	**Holzprodukte und Holzwerkstoffe** für die Baukonstruktion (Holzwerkstoffplatten sind den Bauplatten zugeordnet, Holzdämmplatten den Dämmstoffen) 
4.	**Bauplatten** (inklusive Holzwerkstoffplatten)
5.	**Dämmstoffe** (wegen der Vielzahl gemeinsamer Attributen in allen Formen, also in Platten, Matten, als lose Schüttung, usw.)
6.	**Beläge, Abdichtungen aus Folien und Bahnen:** Hier wurde die Gliederung nach Stoffart zugunsten der vorrangigen Verwendungsart durchbrochen. Das wurde 
    als sinnvoll erachtet, weil die zu Grunde liegenden Regelwerke handwerksorientiert sind und Baustoffe aus verschiedener Herkunft in einem Regelwerk vereinen 
    (z.B. Bodenleger, Fliesenleger, Estrichleger-Regeln). Soweit die Beläge nicht aus Elementen bestehen (wie Fliesen, Pflaster oder Parkett), handelt es sich 
    um Bahnenware, die von der Rolle kommt (Beläge, Abdichtungen, Folien und andere Bahnen wie Dampfsperren, Dränmatten, Schutzlagen, u.a.m.)
7.	**Halbzeuge aus Metall**
---
Viele Bauteile lassen sich aus Grundbaustoffen herstellen, ihre Eigenschaften werden aber durch komplexe Zusammenhänge bestimmt. Die weiteren Gliederungspunkte orientieren sich daher an der **Bauart:**

8.	**Kernkonstruktionen für Decken und Dächer** (Rohdecken)
9.	**Kernkonstruktionen für Wände** (Rohwände)
---
Die Außenflächen des Gebäudes werden in der Regel raum- und geschossunabhängig geplant. Es handelt sich oft um untereinander logisch vernetzte Schichtenfolgen mit erheblichen gegenseitigen Abhängigkeiten. Zudem handelt es sich oft um Systeme, d.h. die bauaufsichtliche Freigabe wird nur für das komplette Paket unter Berücksichtigung einer Reihe von Randbedingungen erteilt. Unabhängig davon müssen Varianten möglich sein, z.B. durch Variation der Eigenschaften einzelner Schichten. Hierfür steht mit den Gliederungspunkten 10 bis 13 ein Baukasten zur Verfügung. Zukünftig sind „Wizards“ (Konstruktions-Assistenten) vorgesehen.

10.	**Deckungsbaustoffe** für Dächer
11.	**Bekleidungsbaustoffe** für Fassaden
12.	**Vorhangfassaden** als Gesamtkonstruktionen
13.	**Bekleidungsbaustoffe** für Deckenunterseiten
---
Bauteile, die nicht Schicht für Schicht aufgebaut werden, kommen als beiderseitig flächenfertige Elemente auf die Baustelle:

14.	**Bauelemente für Öffnungen in Wänden, Decken und Dächern** (inklusive Zusatzbauteilen)
15.	**Skalierbare Bauelemente für Öffnungen in Wänden** (Glasbausteine, Profilitverglasung)
16.	**Treppenvarianten, Aufzugsschächte**
---
Da in der frühen Planungsphase die Anforderungen an die Bauelemente makroskopisch gestellt werden (z. B. an U-Werte), ist es sinnvoll, die dafür in Frage kommenden Baustoffe mit **Vorgabewerten** für die entsprechenden Baueigenschaften zu versehen.

In einer Ausbaustufe von BIM.click sind **Assistenten** vorgesehen, die die Berechnung „von der anderen Seite her“ aus den einzelnen Baueigenschaften der Bestandteile ermöglichen, also z.B. 
<em>U<sub>w</sub></em> aus <em>U<sub>g</sub></em>, <em>A<sub>g</sub></em>, <em>U<sub>f</sub></em>, <em>A<sub>f</sub></em> und
<em><span>Ψ</span><span>&#x00B7;</span>L</em>. Dabei soll die Erreichung bestimmter Sollwerte aus den Istwerten der beteiligten Produkte bestimmt werden.

:::

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="3.3-Sonstiges"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="3-3-Sonstiges"/>

## 3.3 Sonstiges

Hierzu gehört das **Markieren** und **Verschieben** bzw. **Kopieren** von **Zweigen** (d.h. bestimmten Elternbaueinheiten
einschließlich ihrer direkten und indirekten Kindbaueinheiten, falls vorhanden) im Baustoffbaum, welches mit **Kontextmenüs** auf Knoten im Baum erfolgt. Dabei wird zunächst der zu
verschiebende bzw. zu kopierende (d.h. zu bewegende) Zweig per Kontextmenü "Markierung am Zweig
setzen/entfernen für Verschieben/Kopieren" an seinem Wurzelknoten **markiert.** Anschließend wird mit
einem weiteren Kontextmenü "Markierten Zweig hierher verschieben" bzw. "Markierten Zweig hierher kopieren"
an einem Zielknoten (welcher als **Zielelternknoten des zu bewegenden Zweigs** bezeichnet wird) der
markierte Zweig unter diesen Zielelternknoten **verschoben** bzw. **kopiert.**

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="3.3.1-Unterabschnitt"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="3-3-1-Unterabschnitt"/>

### 3.3.1 Unterabschnitt

Dieser Abschnitt ist noch im Aufbau.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="4-Bauinformationen"/>

# 4 Bauinformationen

<a id="4.1-Ueberblick"/>
<a id="4-1-Ueberblick"/>

## 4.1 Überblick zu Bauinformationen

Zu den **`Bauinformationen`** zählen zum Beispiel Normen, Regelwerke, Vorschriften, Richtlinien, Zulassungen, Nachweise, Datenblätter und sonstige Informationen. Sie werden vom System eigenständig verwaltet. Sie können interne und externe Links auf Dokumente und Webseiten enthalten. Die Bauinformationen können nach Bedarf beliebigen Baustoffen, Baueinheiten, Baueigenschaften und Baueigenschaftsprofilen **zugeordnet** werden. 

---

<a id="4.2-Bauinformationsprofile"/>
<a id="4-2-Bauinformationsprofile"/>

## 4.2 Bauinformationsprofile

Fachlich zusammengehörige **`Bauinformationen`** können zu **`Bauinformationsprofilen`** zusammengefasst und gemeinsam verwaltet werden. Bauinformationsprofile sind Mengen von dem Bauinformationsprofil **zugeordneten** Bauinformationen.

Eine bestimmte Bauinformation kann dabei beliebig vielen verschiedenen Bauinformationsprofilen zugeordnet werden. Umgekehrt können einem bestimmten Bauinformationsprofil beliebig viele verschiedene Bauinformationen zugeordnet werden.

Bauinformationsprofile können wiederum Baueinheiten und Baustoffen **zugeordnet** werden. Dabei werden alle dem betreffenden Bauinformationsprofil zugeordneten Bauinformationen gemeinsam der Baueinheit oder dem Baustoff zugeordnet.

<!-------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<!-- ACHTUNG: Diese Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links innerhalb von bim-click-dokumenation.md! -->
<a id="5-Baueigenschaften"/>

---
# 5 Baueigenschaften

<a id="5.1-Ueberblick"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-1-Ueberblick"/>

## 5.1 Überblick zu Baueigenschaften

**`Baueigenschaften`**  sind fachliche Eigenschaften, die in der baulichen Planung definiert und verwendet werden. Sie sind als **Attribute** sowohl an **`Baustoffen`** als auch 
an **`Baueinheiten`** in Bauvorhaben verfügbar. Es kann sich bei den Baueigenschaften um technische (z.B. bauphysikalische), betriebswirtschaftliche (z.B. abrechnungsrelevante) oder sonstige (z.B. geografische) Attribute handeln.

::: info Analogie
Ähnlich wie Moleküle aus Atomen aufgebaut sind, sind **Baueigenschaften** die atomaren Bausteine, aus denen komplexere Modellkonstrukte
**(Baustoffe** und **Baueinheiten)** aufgebaut sind.
:::

Baueigenschaften können bei Bedarf an bestimmten **Baustoffen** bzw. **Baueinheiten** **aktiviert** werden. Nach einer solchen **`Aktivierung`** an einem Baustoff oder einer Baueinheit kann eine
Baueigenschaft (gemäß dem bei Definition für sie festgelegten **`Wertetyp`**) spezifische **Werte** an dem betreffenden Baustoff bzw. der betreffenden Baueinheit annehmen. Dieselbe Baueigenschaft kann an unterschiedlichen Baustoffen bzw. Baueinheiten, an denen sie aktiviert ist, unterschiedliche Werte annehmen.

Zusätzlich zu den bereits vordefinierten Baueigenschaften im System lassen sich (mit entsprechender **Benutzerberechtigung)** jederzeit zusätzliche Baueigenschaften **neu anlegen:**

<!-- - sowohl innerhalb von [Baustoffe](/Baustoffe): -->
<!-- disabled wegen Reload der App bei aktiver Benutzerauthentifizierung -->

- sowohl innerhalb von **`Baustoffen`**:
  1. Links im Baustoffbaum einen Baustoff auswählen
  2. Rechts oben das Tab "Baueigenschaften" auswählen
  3. Darunter das Tab "Neuanlage einer Baueigenschaft" auswählen

<!-- - als auch innerhalb von [Bauvorhaben](/Bauvorhaben): -->
<!-- disabled wegen Reload der App bei aktiver Benutzerauthentifizierung -->

- als auch innerhalb von **`Bauvorhaben`**
  1. Links im Bauvorhabenbaum eine Baueinheit auswählen
  2. Rechts oben das Tab "Baueigenschaften" auswählen
  3. Darunter das Tab "Neuanlage einer Baueigenschaft" auswählen

Dabei können Baueigenschaften **entweder im Baustoffbaum oder im Bauvorhabenbaum oder in beiden Bäumen angelegt werden.** Abhängig davon 
können sie an Baustoffen, an Baueinheiten oder an beiden verwendet werden.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="5.2-Beispiele-fuer-Baueigenschaften-mit-unterschiedlichen-Wertetypen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links innerhalb von bim-click-dokumenation.md! -->
<!-- Daher den "." in "2.2" hier durch "-" ersetzt -->
<a id="5-2-Beispiele-fuer-Baueigenschaften-mit-unterschiedlichen-Wertetypen"/>

## 5.2 Beispiele für Baueigenschaften mit unterschiedlichen Wertetypen

Der **`Wertetyp`** ist die wichtigste **typbezogene Angabe** zu einer Baueigenschaft: Jede Baueigenschaft erhält bei ihrer Neuanlage einen eindeutigen **`Wertetyp`**. Dieser Wertetyp bestimmt, welchen **Wert** bzw. welche **Werte** die
Baueigenschaft annehmen darf.

::: tip Hinweis zum Wertetyp
Weil der **`Wertetyp`** so grundlegend für jede Baueigenschaft in allen Baueinheiten
und Baustoffen ist, kann er nach der Neuanlage einer Baueigenschaft **nicht geändert** werden. Wenn eine bereits angelegte Baueigenschaft also einen **anderen Wertetyp** erhalten soll, sollte stattdessen eine **neue Baueigenschaft** mit dem
gewünschten Wertetyp angelegt werden.
Die bisherige Baueigenschaft kann gelöscht werden, falls sie nicht weiterhin in vorhandenen Baueigenschaftsprofilformularen,
Bauvorhaben/Baueinheiten oder Baustoffen benötigt wird.
:::

Bestimmte Wertetypen erlauben es, dass eine Baueigenschaft auch **gleichzeitig mehrere Werte** repräsentieren kann. Dies können **paarige** Werte sein
bei Kennwertepaaren, Datumswertepaaren, Tageszeitwertepaaren oder Bezeichnungsswertepaaren, oder mehrere auswählbare **Optionen** bei Aufzählungswerten.

Hier einige Beispiele für die Nutzung verschiedenener **Wertetypen** von Baueigenschaften mit dafür zugewiesenen passenden **Werten** in den entsprechenden Spalten rechts in der Tabelle:

<!-- Markdown Table: -->

| Beispiel                                                                       | Beispielhafte Eigenschaftsbezeichnung   | Wertetyp              | Kennwert 1 | Kennwert 2 | Symbol | Einheit | Operator |    Formel |    Datum 1 |    Datum 2 | Tageszeit 1 | Tageszeit 2 | Bezeichnung 1       | Bezeichnung 2      | Wahrheitswert | Aufzählungswert                                  |
| :----------------------------------------------------------------------------- | :-------------------------------------- | :-------------------- | ---------: | ---------: | -----: | ------: | -------: |---------: | ---------: | ---------: | ----------: | ----------: | :------------------ | :----------------- | ------------: | :----------------------------------------------- |
| Einfacher Kennwert mit kennwertbezogenen Angaben                               | dynamische Steifigkeit                  | Kennwert              |        200 |            |      s |   MN/m³ |        ≤ |[µm/N] = 1/(dyn. Steifigkeit)|            |            |             |             |                     |                    |               |                                                  |
| Kennwertepaar mit kennwertbezogenen Angaben, z.B. für Wertebereiche ("Ranges") | Wertebereich für dynamische Steifigkeit | Kennwertepaar         |        200 |        300 |     s' |   MN/m³ |          |            |            |            |             |             |                     |                    |               |                                                  |  |
| Kennwertepaar mit optionalem Bezeichnungswertepaar                             | Geokoordinaten                          | Kennwertepaar         |   48.87619 |   9.389161 |      φ |       ° |          |            |            |            |             |             | Geografische Breite | Geografische Länge |               |
| Einfacher Datumswert                                                           | Verfügbarkeitsdatum                     | Datumswert            |            |            |        |         |          |            | 01.01.2020 |            |             |             |                     |                    |               |                                                  |
| Datumswertepaar mit optionalem Bezeichnungswertepaar                           | Gültigkeitzszeitraum                    | Datumswertepaar       |            |            |        |         |          |            | 01.01.2020 | 31.12.2022 |             |             | Gültig ab           | Gültig bis         |               |                                                  |
| Einfacher Tageszeitswert                                                       | Nutzungsbeginn                          | Tageszeitwert         |            |            |        |         |          |            |            |            |       09:00 |             |                     |                    |               |                                                  |
| Tageszeitwertepaar mit optionalem Bezeichnungswertepaar                        | Nutzungszeitraum                        | Tageszeitwertepaar    |            |            |        |         |          |            |            |            |       08:00 |       18:00 | Nutzungsbeginn      | Nutzungsende       |               |                                                  |
| Einfacher Bezeichnungswert                                                     | Herstellerkurzbezeichnung               | Bezeichnungswert      |            |            |        |         |          |            |            |            |             |             | Knauf               |                    |               |                                                  |
| Bezeichnungswertepaar                                                          | Herstellerlangbezeichnung               | Bezeichnungswertepaar |            |            |        |         |          |            |            |            |             |             | Knauf Bauprodukte   | GmbH & Co. KG      |               |                                                  |
| Wahrheitswert ("true" oder "false")                                            | Hat Ökolabel 'Blauer Engel'?            | Wahrheitswert         |            |            |        |         |          |            |            |            |             |             |                     |                    |          true |                                                  |
| Aufzählungswert (Einfachauswahl) <br />(siehe Hinweis [1])                     | Art der Baumaßnahme                     | Aufzählungswert       |            |            |        |         |          |            |            |            |             |             |                     |                    |               | 'Umbau'                                          |
| Aufzählungswert (Mehrfachauswahl) <br />(siehe Hinweis [2])                    | beauftragter Leistungsumfang            | Aufzählungswert       |            |            |        |         |          |            |            |            |             |             |                     |                    |               | 'Wärmeschutz' Schallschutz' 'Abdichtungstechnik' |

::: tip Hinweise zu den Aufzählungswerten
---
- **[1] Einfachauswahl**

  - Auswahl genau **einer Option** als Wert, aus mehreren, frei definierbaren Optionen
  - In obigem Beispiel:
    - Eigenschaft 'Art der Baumaßnahme' als Aufzählungswert aus mehreren Optionen:
      - 'Neubau', 'Umbau', 'Abriß', 'Sanierung'
    - Als **Einfachauswahl** wurde **eine Option** 'Umbau' als Wert ausgewählt
  - Weiteres Beispiel:
    - Eigenschaft "Größe' als Aufzählungswert aus mehreren Optionen:
      - 'xxs', 'xs', 's', 'm', 'l', 'xl, 'xxl'
    - Als **Einfachauswahl** kann **eine Option** als Wert auswgewählt werden:
      - 'm' (oder beliebige andere Option)
---
* **[2] Mehrfachauswahl**

  - Zusätzlich ist auch eine **Mehrfachauswahl** von **mehreren Optionen** als Werte möglich, aus mehreren, frei definierbaren Optionen
  - In obigem Beispiel:
    - Eigenschaft 'beauftragter Leistungsumfang' als Aufzählungswert aus mehreren Optionen:
      - 'Wärmeschutz', 'Schallschutz', 'Brandschutz', 'Raumakustik',
        'Feuchteschutz', 'Holzschutz', 'Abdichtungstechnik', 'Korrosionsschutz', 'Schadstoffschutz', 'Ökobilanz', 'Nachhaltigkeit'
    - Als **Mehrfachauswahl** wurden **drei Optionen** als Werte ausgewählt:
      - 'Wärmeschutz', Schallschutz', Abdichtungstechnik'

:::

---

<a id="5.3-Aktivierung-und-Wertevererbung-von-Baueigenschaften"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften"/>

## 5.3 Aktivierung und Wertevererbung von Baueigenschaften

Wenn eine Baueigenschaft samt Wertetyp im System **definiert** wird, kann sie entweder an allen Baueinheiten im Bauvorhabenbaum, oder an allen
Baustoffen im Baustoffbaum, oder an allen Baueinheiten bzw. Baustoffen in beiden Bäumen **angelegt** werden, und steht dann
dementsprechend im Bauvorhabenbaum, im Baustoffbaum oder in beiden Bäumen zur weiteren Verwendung zur Verfügung.

Um dann die Baueigenschaft einem bestimmten Baustoff im Baustoffbaum bzw. einer bestimmten Baueinheit im Bauvorhabenbaum an diesem Knoten im
Baum als **zutreffend** zuzuordnen und ihr spezifische **Werte**
entsprechend des für sie definierten **`Wertetyps`** zuweisen zu können, muss sie an dem betreffenden Baustoff im Baustoffbaum bzw. der betreffenden Baueinheit im
Bauvorhabenbaum **aktiviert** werden.

::: info Tipps
---

- ==Wichtige **Hinweise** vorab:==

  - Bei der täglichen Arbeit von **Mitarbeitern** mit dem System ist es normalerweise nicht notwendig, einzelne 
    Baueigenschaften zu aktivieren, was hier 
    beschrieben wird. Stattdessen erfolgt die Modellierung von Bauvorhaben mit Hilfe von `Baueigenschaftsprofilen`,
    welche fachlich zusammengehörige Baueigenschaften zusammenfassen. Durch die Auswahl und Aktivierung eines solchen 
    Baueigenschaftsprofils an einer Baueinheit durch einen Benutzer werden dabei vom System automatisch alle zugehörigen 
    Baueigenschaften aktiviert. Werte für die betreffenden Baueigenschaften können dann mit Hilfe von 
    `Baueigenschaftsprofilformularen` angezeigt,
    bearbeitet und gespeichert werden.

  - **Administratoren** können jedoch bei Bedarf einzelne Baueigenschaften
    aktivieren und deaktivieren, was im Folgenden beschrieben wird, weil es eine
    grundlegende Funktion des Systems ist.

- Die **`Aktivierung`** von einzelnen Baueigenschaften an einer im Bauvorhabenbaum ausgewählten Baueinheit im Tab "Bauvorhaben" oder an einem im Baustoffbaum ausgewählten Baustoff im Tab "Baustoffe" kann mit den Unter-Tabs
  **"Baueigenschaften an der Baueinheit" > "Übersicht aller Baueigenschaften"** bzw.
  **"Baueigenschaften am Baustoff" > "Übersicht aller Baueigenschaften"** durchgeführt werden:

  - Dazu in der betreffenden Zeile für die (je nach bisherigem Aktivierungszustand) zu aktivierende bzw. zu deaktivierende Baueigenschaft die rechte Maustaste betätigen. Es erscheint dann ein Kontextmenü. In diesem Kontextmenü **"Baueigenschaft auswählen und aktivieren/deaktivieren"** anwählen - dies aktiviert eine deaktivierte 
    Baueigenschaft bzw. deaktiviert eine bereits aktivierte Baueigenschaft an der betreffenden Baueinheit bzw. dem betreffenden Baustoff.
    <!-- Markdown Images und Links, siehe https://quasarframework.github.io/quasar-ui-qmarkdown/examples -->
    <!-- Markdown Image Syntax: -->
    <!-- ![id-fuer-das-image](url "Mouseover Text für das Bild" =300x300) -->
    <!-- Markdown Link Syntax: -->
    <!-- ![Anzeigetext für den Link](url "Mouseover Text für das Bild" =300x300) -->
    <!-- ACHTUNG: Zwischen "]" und "(" darf jeweils kein Blank sein!!! -->

    <!-- NEU: Markdown Images mit externen Links (beginnen mit "http://" oder "https://") -->
    <!-- ACHTUNG: Markdown kann zwar html-Tags erkennen, aber offenbar keine Vue Tags -->
    <!-- Damit können die beiden Fälle nicht einfach per <div v-if="process.env.NODE_ENV != 'production'" unterschieden werden! -->
    <!-- NEU: Images werden lokal und auf Heroku aus dem Backend Server Directory tmp/download/img geholt,
    <!-- welches statisch vom Express Backend Server geserved wird! -->
    <!-- =========================================================================================================================================================== -->
    <!-- #391: Screenshot aus Sicherheitsgründen testweise on Backend URL (obiges Download-Verzeichnis dort) ins Frontend verschoben, nach /statics/screenshots -->
    <!-- Allerdings bleibt wegen des obigen Problems nur die Möglichkeit, einen https-Link nach Heroku dafür zu nehmen, wozu dann Logon nötig ist zum Zugriff auf die Datei (was aus Sicherheitsgründen aber auch sinnvoll ist. Lokal ist das aber vor dem Deployment der zugehörigen Datei nach Heroku ein "broken Link"! -->
    <!-- Diese Lösung (verlinkte Files im Frontend halten in /statics dort) wieder disabled, nachdem (siehe #391) für das Backend eine Protection für die Files im
    <!-- dortigen /download Folder gefunden wurde! -->
    <!--
    ![Screenshot-Aktivieren-Deaktivieren](https://bimclick.herokuapp.com/statics/screenshots/dokumentation-screenshot-bauvorhaben-baueigenschaften-uebersicht-baueigenschaft-aktivieren.png "Baueigenschaftsprofil aktivieren per Kontextmenü")
    -->
    ![Screenshot-Aktivieren-Deaktivieren](https://bimclickserver.herokuapp.com/screenshots/dokumentation-screenshot-bauvorhaben-baueigenschaften-uebersicht-baueigenschaft-aktivieren.png "Baueigenschaft aktivieren/deaktivieren")
    <!-- ================================================================================================================================== -->
    <!-- Test von Links zum assets-Folder - funktionieren nicht (q-img in dokumentation.vue mit "~" in der URL funktioniert jedoch dafür!!! -->
    <!-- ![Estrich](http://localhost:4200/assets/estrich.jpg "Estrich anzeigen") --> <!-- Wirft 404! -->
    <!-- =========================================================================================================================================================== -->
    <!-- Lokaler Markdown Link: -->
    <!-- ![Screenshot-Aktivieren-Deaktivieren](http://localhost:8080/img/dokumentation-screenshot-baueigenschaft-aktivieren-deaktivieren-v-1-0-26.png "Baueigenschaft aktivieren/deaktivieren") -->
    <!-- TODO - URL: https funktioniert nicht, localhost ist temporär -->
    <!-- Markdown Link für externe URL: -->
    <!-- [DIN-Norm](https://www.baunormenlexikon.de/norm/din-18560-2/b2f61f00-0e42-4939-9720-31957644a11b "Baunormenlexikon") -->
  - In diesem Fall können nicht direkt Werte für die aktivierte Baueigenschaft eingegeben werden. Dies kann separat mittels der Schaltfläche **"Baueigenschaft bearbeiten"** erfolgen,
    oder mittels des obigen Kontextmenüs und der Auswahl **"Baueigenschaft auswählen und anzeigen/bearbeiten"**. Das System führt dann im Tab "Details zur ausgewählten Baueigenschaft" auch eine Prüfung der unten beschriebenen 
    `Wertevererbungsregel` durch und vererbt ggf. Werte von einem Elternknoten im Baustoffbaum bzw. Bauvorhabenbaum weiter an die aktivierte Baueigenschaft. 
  - **Hinweis:** Diese Art der Werteeingabe ist nur für **Admininstratoren** möglich. **Mitarbeiter** können Werte im
    Tab "Details zur ausgewählten Baueigenschaft" ansehen, jedoch keine Änderungen an diesen vornehmen. Mitarbeiter
    können Werte von Baueigenschaften mit vom System zur Verfügung gestellten, einfach benutzbaren fachlichen `Baueigenschaftsprofilformularen`
    bearbeiten, mit denen die Werte von fachlich zu `Baueigenschaftsprofilen` zusammengefasste Baueigenschaften
    bequem angezeigt, bearbeitet und gespeichert werden können.
  

- Alternativ kann im selben Tab **"Baueigenschaften an der Baueinheit" > "Übersicht aller Baueigenschaften"** bzw. **"Baueigenschaften am Baustoff" > "Übersicht aller Baueigenschaften"** in der Tabelle der Baueigenschaften eine Baueigenschaft ausgewählt werden und dann mit der 
  Schaltfläche **"Baueigenschaft bearbeiten"** das Tab **"Details zur ausgewählten Baueigenschaft"** angewählt werden. Dort kann mittels der Radio-Knöpfe 
  <font class="accent">**"Aktiviert"** </font> bzw. **"Deaktiviert"** ebenfalls eine Aktivierung bzw. Deaktivierung durchgeführt werdenn. Gleichzeitig können in diesem Tab 
  auch Werte für die aktivierte Baueigenschaft eingegeben werden, sofern diese nicht auf Grund der unten beschriebenen `Wertevererbungsregel` von einem Elternknoten weitervererbt werden.
:::

Bei der Aktivierung von Baueigenschaften gilt eine grundlegende Regel:

::: warning Regel
---
`Aktivierungsregel`: Es können an einem bestimmten Baustoff im Baustoffbaum bzw. an einer Baueinheit im
Bauvorhabenbaum nur solche Baueigenschaften **aktiviert** werden, die auch an seinem bzw. ihrem **Elternknoten aktiviert** sind.

**Hinweis:** Diese Aktivierungsregel gilt in BIM.<em>click</em> für alle Baueigenschaften, stets, und an allen Knoten im Baustoff- und im Bauvorhabenbaum.
Damit die Integrität der Daten gewahrt bleibt, auf der wichtige regelbasierte Auswertungen und Berechnungen beruhen, sind keine Ausnahmen von dieser Regel erlaubt.
:::

Die Einhaltung dieser `Aktivierungsregel` wird vom System sichergestellt:

- Wenn eine Baueigenschaft an einem Baustoff im Baustoffbaum oder einer Baueinheit im Bauvorhabenbaum vom Benutzer **aktiviert** wird, führt das System eine **automatische implizite Aktivierung** der Baueigenschaft an allen direkten und indirekten **Elternknoten im Pfad** vom diesem Baustoff bzw. dieser Baueinheit bis zum Wurzelknoten im Baustoffbaum bzw. Bauvorhabenbaum durch. Der Benutzer muss also die Baueigenschaft nicht an allen Baustoffen bzw. Baueinheiten im betreffenden Pfad einzeln aktivieren, sondern kann die Aktivierung direkt und einmalig am gewünschten Baustoff bzw. der gewünschten Baueinheit durchführen.

- Wenn eine Baueigenschaft an einem Baustoff im Baustoffbaum oder einer Baueinheit im Bauvorhabenbaum vom Benutzer **deaktiviert** wird, führt das System eine
  **automatische implizite Deaktivierung** der Baueigenschaft an allen direkten und indirekten **Kindknoten im Unterbaum** dieses Baustoffs im Baustoffbaum bzw. dieser Baueinheit im Bauvorhabenbaum durch. Der Benutzer muss also die Baueigenschaft nicht an allen Baustoffen bzw. Baueinheiten im betreffenden Unterbaum einzeln deaktivieren, sondern kann die Deaktivierung direkt und einmalig am gewünschten Baustoff bzw. der gewünschten Baueinheit durchführen.

Dies erleichtert die Arbeit mit dem System und gewährleistet gleichzeitig die Integrität aller eigenschaftsbezogenen Daten im Sinne der oben beschriebenen `Aktivierungsregel`.

::: tip Hinweise zur Aktivierung und Deaktivierung
---
- Der Baustoff- und der Bauvorhabenbaum repräsentieren damit eine **planerische Verfeinerung** vom **Generellen** (obere Knoten im Baum, beginnend mit dem Wurzelknoten) zum **Speziellen** (untere Knoten im Baum, endend mit Blattknoten):

  - Am **Wurzelknoten** im jeweiligen Baum ist stets die **Obermenge** aller in den Knoten unterhalb des Wurzelknotens aktivierten Baueigenschaften **aktiviert**
  - An den **Verzweigungs-** und **Blattknoten** im Baum sind jeweils nur **bestimmte,** vom Benutzer ausgewählte Baueigenschaften **aktiviert**
  - Diese können auch an den **direkten** und **indirekten Kindknoten** eines Verzweigungsknotens **aktiviert** sein
  - Sobald an einem **Verzweigungsknoten** die Baueigenschaft **deaktiviert** wurde, ist diese wegen der `Aktivierungsregel` auch an allen ihren **direkten** und
    **indirekten Kindknoten deaktiviert**
  - Umgekehrt gilt, dass an einem beliebigen Knoten im Baum **nur solche** Baueigenschaften **aktiviert**
    werden können, die in **allen** Knoten im Pfad zwischen Wurzelknoten und dem betreffenden Knoten im Baustoff- bzw. Bauvorhabenbaum **aktiviert** wurden.

* Für einen bestimmten Baustoff bzw. eine Baueinheit **irrelevante** Baueigenschaften können am betreffenden Zweig im Baustoffbaum bzw. Bauvorhabenbaum
  **deaktiviert** werden. Diese **Deaktivierung** gilt wegen der `Aktivierungsregel` auch an allen direkten und indirekten Kindknoten eines **deaktivierten** Knotens
  im Baum.

* Weiterhin stellt die `Aktivierungsregel` zusammen mit der unten beschriebenen `Wertevererbungsregel` sicher, dass für die aktivierte, d.h. zutreffende
  Baueigenschaft **definierte Werte** innerhalb des Baustoffbaums bzw. Bauvorhabenbaums von deren Elternknoten an die Kindknoten **weitervererbt** werden.

* Bei der **Deaktivierung** einer Baueigenschaft an einem Knoten erfolgt, wie oben beschrieben, eine implizite Deaktivierung der Baueigenschaft
  an allen direkten und indirekten **Kindknoten** des Knotens, an dem die Deaktivierung erfolgt. Es erfolgt dabei absichtlich **keine implizite Deaktivierung** der Baueigenschaft an direkten oder
  indirekten **Elternknoten**. Dies wäre wegen der `Aktivierungsregel` ohnehin nur dann zulässig, wenn es an solchen Elternknoten keine anderen Kindknoten
   mehr gäbe, an denen die Baueigenschaft aktiviert ist  (also Geschwisterknoten des Knotens, an dem die Deaktivierung erfolgt). Außerdem könnte dies im Rahmen der Deaktivierung von
  Baueigenschaftsprofilen dazu führen, dass Baueigenschaften, die als **gemeinsame Baueigenschaften** mehreren Baueigenschaftsprofilen zugeordnet sind, und im Rahmen
  der Deaktivierung eines dieser Profile auch an einem Elternknoten deaktiviert würden, anschließend Fehler bei der 
  Anzeige des
  Baueigenschaftsprofilformulars für das oder die anderen Profile am Elternknoten verursachen würden, da zur Anzeige
  eines Baueigenschaftsprofilformulars für ein Profil stets alle dem Profil zugeordneten Baueigenschaften aktiviert sein müssen.
  :::

Insgesamt hat die **`Aktivierung`** einer Baueigenschaft zur Folge:

1. Die aktivierte Baueigenschaft wird dem betreffenden Baustoff bzw. der betreffenden Baueinheit als **zutreffend** zugeordnet

2. Für die aktivierte Baueigenschaft können entsprechend dem für sie definierten Wertetyp **(Eigenschafts-)Werte definiert** (d.h. zugewiesen) werden

::: tip Hinweise zur Wertedefinition
---
- Es ist nicht zwingend notwendig, dass **sofort** bei Aktivierung einer Baueigenschaft Werte für diese am betreffenden
  Baustoff bzw. der betreffenden Baueinheit definiert werden. Dies kann auch **später** im Laufe einer iterativen Planung erfolgen.

- Die definierten Werte sind **spezifisch** für den betreffenden **`Baustoff`** bzw. die betreffende **`Baueinheit`**, d.h. dieselbe (aktivierte) Baueigenschaft
  kann, sofern sinnvoll und im Einklang mit der unten beschriebenen `Wertevererbungsregel` an verschiedenen Knoten im Baustoffbaum bzw. Bauvorhabenbaum
  **unterschiedliche Werte** (desselben Wertetyps) aufweisen.

  Beispiel: Im Baustoffbaum können unterschiedliche Baustoffe unterschiedliche Kennwerte für dieselbe Baueigenschaft aufweisen.

- Umgekehrt können einer an einen bestimmten Baustoff im Baustoffbaum bzw. an einer Baueinheit im Bauvorhabenbaum **deaktivierten** Baueigenschaft **keine Werte**
  zugewiesen werden - deren Werte sind dann immer **undefiniert.**
  :::

3. dass die an einem bestimmmte Baustoff im Baustoffbaum bzw. einer bestimmten Baueinheit im Bauvorhabenbaum aktivierte Baueigenschaft im gesamten Zweig des
   Baustoffbaums bzw. Bauvorhabenbaums **sichtbar** ist, und ihre Werte ggf. zur **Berechnung** von weiteren Baueigenschaften in diesem Zweig des Baums
   herangezogen werden können.

4. dass die an einem bestimmten Baustoff bzw. einer Baueinheit aktivierte Baueigenschaft von seinem bzw. ihrem **Elternknoten** im Baustoffbaum bzw. Bauvorhabenbaum
   ggf. **Werte erbt.** Dabei gilt:

::: warning Regel
---
`Wertevererbungsregel`: Hat die Baueigenschaft, die **aktiviert** wird, am **Elternknoten** des betreffenden Baustoffs im Baustoffbaum bzw. der betreffenden
Baueinheit im Bauvorhabenbaum **definierte Werte,** werden diese an die aktivierte Baueigenschaft **weitervererbt.** Dabei gilt wegen der `Aktivierungsregel`,
dass die Baueigenschaft am **Elternknoten** ebenfalls **aktiviert** sein muss.

**Hinweis:** Diese Wertevererbungsregel gilt in BIM.<em>click</em> für alle Baueigenschaften, stets, und an allen Knoten im Baustoff- und im Bauvorhabenbaum.
Damit die Integrität der Daten gewahrt bleibt, auf der wichtige regelbasierte Auswertungen und Berechnungen beruhen, sind keine Ausnahmen von dieser Regel erlaubt.
:::

::: tip Hinweise zur Wertevererbung
---
- Durch die oben beschriebene `Wertevererbungsregel` werden die für eine bestimmte, in einem Zweig im Baustoffbaum bzw.
  Bauvorhabenbaum aktivierte Baueigenschaft definierten Werte automatisch an alle direkten und indirekten Kindknoten **weitervererbt,** sofern die betreffende
  Baueigenschaft dort ebenfalls **aktiviert** ist.

- Falls dabei im Elternknoten **keine Werte definiert** wurden, werden auch **keine Werte** an die direkten und indirekten Kindknoten **weitervererbt.** Der
  Benutzer kann in diesem Fall allerdings selbst Werte an Kindknoten des Elternknotens definieren, die dann wiederum an deren direkte und indirekte Kindknoten weitervererbt
  werden, sofern die betreffende Baueigenschaft dort ebenfalls **aktiviert** ist. Diese Werte können unter Geschwisterknoten der ersten Kindebene
  unterschiedlich sein.

- Es wird insgesamt **Wertekonsistenz** sichergestellt, indem, sobald ab einem bestimmmten Knoten in einem Pfad im Baustoff- bzw. Bauvorhabenbaum Werte für eine
  aktivierte Baueigenschaft definiert werden, alle direkten und indirekten Kindknoten dieses Knotens dieselben Werte für diese aktvierte Baueigenschaft aufweisen.
  Diese Wertekonsistenz wird auch bei Änderungen von Werten in Knoten im Baum sichergestellt.

:::

::: info Beispiele zur Wertevererbung
---
Beispiel 1.a (Baustoffbaum): **Keine Wertevererbung** bei **undefiniertem** Eigenschaftswert im **Elternknoten**

- Baueigenschaft:
  - Baueigenschaftsbezeichnung: "Biegezugfestigkeitsklasse"
  - Aktivierungszustand: In allen beteiligten Knoten im Baum aktiviert
  - Wertetyp: "Aufzählungswert"
    - Mögliche Optionen: "F1", "F2", "F3", "F4", "F5"
- Elternknoten:
  - Bezeichnung; "Estriche"
  - Knotentyp: "Verzweigungsknoten"
  - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **undefiniert** **(wird nicht vererbt an Kindknoten)**
- Kindknoten:
  - Bezeichnung; "Wenig zugfeste Estriche"
  - Knotentyp: "Verzweigungsknoten"
  - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **"F1"** oder anderer Wert aus den möglichen Optionen, oder **undefiniert** **(nicht ererbt vom
    Elternknoten)**
- Weiterer Kindknoten:
  - Bezeichnung; "Sehr zugfeste Estriche"
    - Knotentyp: "Verzweigungsknoten"
    - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **"F5"** oder anderer Wert aus den möglichen Optionen, oder **undefiniert** **(nicht ererbt vom
      Elternknoten)**
- Hinweis: 
  - In diesem Beispiel wird an den Kindknoten dieses Elternknotens eine **Spezialisierung/Verfeinerung** bezüglich der Werte dieser Baueigenschaft erreicht
---
Beispiel 1.b (Bauvorhabenbaum): **Keine Wertevererbung** bei **undefiniertem** Eigenschaftswert im **Elternknoten**

- Baueigenschaft:
  - Baueigenschaftsbezeichnung: "Raumnutzungsprofil"
  - Aktivierungszustand: In allen beteiligten Knoten im Baum aktiviert
  - Wertetyp: "Aufzählungswert"
    - Mögliche Optionen: "Büroraum", "Wohnraum", "Gemischt genutzer Raum"
- Elternknoten:
  - Bezeichnung; "Erdgeschoss"
  - Knotentyp: "Verzweigungsknoten"
  - Eigenschaftswert obiger Baueigenschaft "Raumnutzungsprofil": **undefiniert** **(wird nicht vererbt an Kindknoten)**
- Kindknoten:
  - Bezeichnung; "Büroraum 1"
  - Knotentyp: "Verzweigungsknoten"
  - Eigenschaftswert obiger Baueigenschaft "Raumnutzungsprofil": **"Büroraum"** oder anderer Wert aus den möglichen Optionen, oder **undefiniert** **(nicht ererbt vom
    Elternknoten)**
- Weiterer Kindknoten:
  - Bezeichnung; "Wohnraum 1"
    - Knotentyp: "Verzweigungsknoten"
    - Eigenschaftswert obiger Baueigenschaft "Raumnutzungsprofil": **"Wohnraum"** oder anderer Wert aus den möglichen Optionen, oder **undefiniert** **(nicht ererbt vom
      Elternknoten)**
- Hinweis: 
  - In diesem Beispiel wird an den Kindknoten dieses Elternknotens eine **Spezialisierung/Verfeinerung** bezüglich der Werte dieser Baueigenschaft erreicht
---
Beispiel 2.a (Baustoffbaum): **Wertevererbung** bei **definiertem** Eigenschaftswert im **Elternknoten**

- Baueigenschaft:
  - Baueigenschaftsbezeichnung: "Biegezugfestigkeitsklasse"
  - Aktivierungszustand: In allen beteiligten Knoten im Baum aktiviert
  - Wertetyp: "Aufzählungswert"
    - Mögliche Optionen: "F1", "F2", "F3", "F4", "F5
- Elternknoten:
  - Bezeichnung; "Estriche mit mittlerer Zugfestigkeit"
    - Knotentyp: "Verzweigungsknoten"
      - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **"F3"** **(wird vererbt an Kindknoten)**
- Kindknoten:
  - Bezeichnung; "KBS Estrich CA-C16-F3"
  - Knotentyp: "Blattknoten"
    - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **"F3"** **(ist ererbt vom Elternknoten)**
- Weiterer Kindknoten:
  - Bezeichnung; "RÖFIX 969 Zement-Estrich CT-C16-F3"
  - Knotentyp: "Blattknoten" - Eigenschaftswert obiger Baueigenschaft "Biegezugfestigkeitsklasse": **"F3"** **(ist ererbt vom Elternknoten)**
- Hinweis: 
  - In diesem Beispiel wird im gesamten Unterzweig unter diesem Elternknoten **Konsistenz/Einheitlichkeit** bezüglich der Werte dieser Baueigenschaft erreicht

---
Beispiel 2.b (Bauvorhabenbaum): **Wertevererbung** bei **definiertem** Eigenschaftswert im **Elternknoten**

- Baueigenschaft:
  - Baueigenschaftsbezeichnung: "Niveau an der Eingangstür"
  - Aktivierungszustand: In allen beteiligten Knoten im Baum aktiviert
  - Wertetyp: "Kennwert"
    - Mögliche Werte: Beliebige Gleitkommazahl (z.B. 253,40, Einheit: m)
- Elternknoten:
  - Bezeichnung; "Gebäude 1"
    - Knotentyp: "Verzweigungsknoten"
      - Eigenschaftswert obiger Baueigenschaft "Niveau an der Eingangstür": **"253,40"** **(wird vererbt an Kindknoten)**
- Kindknoten:
  - Bezeichnung; "Erdgeschoss"
  - Knotentyp: "Blattknoten"
    - Eigenschaftswert obiger Baueigenschaft "Niveau an der Eingangstür": **"253,40"** **(ist ererbt vom Elternknoten)**
- Weiterer Kindknoten:
  - Bezeichnung; "Obergeschoss"
  - Knotentyp: "Blattknoten" - Eigenschaftswert obiger Baueigenschaft "Niveau an der Eingangstür": **"253,40"** **(ist ererbt vom Elternknoten)**
- Hinweis: 
  - In diesem Beispiel wird im gesamten Unterzweig unter diesem Elternknoten **Konsistenz/Einheitlichkeit** bezüglich der Werte dieser Baueigenschaft erreicht

:::

::: tip Hinweis zu den Beispielen
---
- Das in den Beispielen 2.a und 2.b gezeigte Modellierungsmuster kann kaskadierend an Elternknoten angewendet werden, die ihrerseits Kindknoten von (Groß-)Elternknoten sind, an denen das in den Beispielen 1.a und 1.b
  gezeigte Modellierungsmuster angewendet wurde.
- Bei solchen Kombinationen sind dann drei oder mehr Ebenen von Knoten beteiligt.
- Spielen Sie einige der Möglichkeiten auf einem Blatt Papier oder im System durch! Es ist einfacher
  als Sie denken, da die Kombinationen nahtlos zueinander passen im Sinne des "click-Effekts" von BIM.click.
:::
---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="5.4-Baueigenschaftsprofile"/>
<a id="5-4-Baueigenschaftsprofile"/>

## 5.4 Baueigenschaftsprofile

<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="5.4.1-Ueberblick"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-1-Ueberblick"/>

## 5.4.1 Überblick zu Baueigenschaftsprofilen

Fachlich zusammengehörige **`Baueigenschaften`** können zu **`Baueigenschaftsprofilen`** zusammengefasst und gemeinsam verwaltet werden. Baueigenschaftsprofile sind Mengen von dem 
Baueigenschaftsprofil **zugeordneten** Baueigenschaften.

Eine bestimmte Baueigenschaft kann dabei beliebig vielen verschiedenen Baueigenschaftsprofilen zugeordnet werden. Umgekehrt können einem bestimmten Baueigenschaftsprofil beliebig viele verschiedene Baueigenschaften zugeordnet werden.

Baueigenschaftsprofile entsprechen im **Industry Foundation Classes (IFC)** Standard für **Building Information Modelling (BIM)** den sogenannten **Property Sets**.

Baueigenschaftsprofile können an Baueinheiten und Baustoffen **aktiviert** werden. Dabei werden alle dem betreffenden Baueigenschaftsprofil zugeordneten Baueigenschaften gemeinsam an der Baueinheit bzw. dem Baustoff aktiviert.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="5.4.2-Beispiele-fuer-Baueigenschaftsprofile"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-2-Beispiele-fuer-Baueigenschaftsprofile"/>

## 5.4.2 Beispiele für Baueigenschaftsprofile

::: info Beispiel für ein Baueigenschaftsprofil
---
Alle für einen bestimmten Raumtyp "Klassenzimmer" relevanten Baueigenschaften können einem Baueigenschaftsprofil zugeordnet werden, das eine passende Bezeichnung (z.B. _"Nutzungsprofil Klassenzimmer"_ oder bei Anwendung der in BIM.click verwendeten Bezeichnungskonventionen _"Baueinheit > Raum > Klassenzimmer"_) tragen kann. Die zugeordneten Baueigenschaften für dieses Baueigenschaftsprofil können dabei der DIN-Normenreihe DIN V 18599 entnommen werden.
:::
---


<!--------------------------------------------------------------------------------------------------------------------------->
<a id="5.4.3-Aktivierung-und-Deaktivierung-von-Baueigenschaftsprofilen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-3-Aktivierung-und-Deaktivierung-von-Baueigenschaftsprofilen"/>

## 5.4.3 Aktivierung und Deaktivierung von Baueigenschaftsprofilen

Durch die **`Aktivierung`** eines Baueigenschaftsprofil an einer Baueinheit im Bauvorhabenbaum oder an einem Baustoff im Baustoffbaum können alle dem Baueigenschaftsprofil 
zugeordneten Baueigenschaften an der betreffenen Baueinheit bzw. dem betreffenden Baustoff **gemeinsam aktiviert** werden. Dabei stellt das System die Einhaltung der `Aktivierungsregel` und der `Wertevererbungsregel` für alle dem Profil zugeordneten Baueigenschaften sicher. 

Die Einhaltung der `Aktivierungsregel` wird vom System **auch für Baueigenschaftsprofile** sichergestellt:

- Bei Aktivierung eines Baueigenschaftsprofils an einem Knoten im Bauvorhabenbaum oder Baustoffbaum wird dieses Baueigenschaftsprofil auch **an allen Elternknoten** aktiviert. 
- Bei Deaktivierung eines Baueigenschaftsprofils an einem Knoten im Bauvorhabenbaum oder Baustoffbaum wird dieses Baueigenschaftsprofil auch **an allen Kindknoten** deaktiviert.

Für eine einem Baueigenschaftsprofil zugeordnete Baueigenschaft können **Vorgabewerte** definiert werden, die beim Aktivieren des Baueigenschaftsprofils an einer Baueinheit im Bauvorhabenbaum oder an einem Baustoff im Baustoffbaum als Werte für diese Baueigenschaft an der betreffenden Baueinheit bzw. dem Baustoff definiert werden. Durch eine **benutzerspezifische Einstellung** kann dabei beeinflusst werden, ob, falls eine dem zu aktivierenden Baueigenschaftsprofil zugeordnete Baueigenschaft im Pfad zwischen Wurzelknoten und dem Knoten, an dem das Baueigenschaftsprofil aktiviert wird, bereits aktiviert ist und definierte Werte hat, statt der Vorgabewerte diese vorhandenen definierten Werte erhalten bleiben, oder ob diese ggf. mit den Vorgabewerten überschrieben werden.

Durch die **`Deaktivierung`** eines Baueigenschaftsprofil an einer Baueinheit im Bauvorhabenbaum oder an einem Baustoff im Baustoffbaum werden alle 
diesem Baueigenschaftsprofil zugeordneten Baueigenschaften an der betreffenen Baueinheit bzw. dem betreffenden Baustoff **deaktiviert**. Um die 
Einhaltung der **`Aktivierungsregel`** zu gewährleisten, werden die dem Profil zugeordneten Baueigenschaften auch an allen direkten und indirekten Kindknoten deaktiviert, falls sie
dort aktiviert waren. Ebenso wird das Baueigenschaftsprofil selbst an allen direkten und indirekten Kindknoten deaktiviert, falls es dort aktiviert war.

Bei der **Deaktivierung** eines Baueigenschaftsprofils erfolgt absichtlich keine Deaktivierung von Baueigenschaften an direkten oder indirekten Elternbaueinheiten. Bei der **Deaktivierung** eines Baueigenschaftsprofils erfolgt
allerdings eine Aktualisierung des Aktivierungszustands dieses Profils an allen direkten und indirekten
Elternknoten - dabei wird das Profil an denjenigen Elternknoten deaktiviert, welche keine verbleibenden
Kindknoten haben, an denen das Profil aktiviert ist. Diese Aktualisierung der aktivierten Profile an den Elternknoten 
erfolgt auch beim Löschen und beim Verschieben von Zweigen im Baum, für die am Wurzelknoten des gelöschten bzw.
verschobenen Zweigs aktivierten Profile.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="5.4.4-Konzeptionelle-Muster-fuer-die-Verwendung-von-Baueigenschaftsprofilen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-4-Konzeptionelle-Muster-fuer-die-Verwendugn-von-Baueigenschaftsprofilen"/>

## 5.4.4 Konzeptionelle Muster für die Verwendung von Baueigenschaftsprofilen

Hier werden einige typische **Musterfälle** für die Modellierung im Sinne von Kombinationen der
**Zuordnung von Baueigenschaften zu Baueigenschaftsprofilen** und der **Aktivierung dieser Profile** an Knoten im Bauvorhaben- oder Baustoffbaum vorgestellt:

::: tip Musterfälle für die Verwendung von Baueigenschaftsprofilen
---
- **Musterfall 1**
  - Viele Profile sind **disjunkt** bezüglich der ihnen zugeordneten Baueigenschaften, da Profile üblicherweise thematisch orientiert 
    sind.
  - Beispiel: Einem Profil "Baueinheit > Geschoss" sind andere Baueigenschaften zugeordnet als einem Profil "Baueinheit > Standort"
  - In diesem Fall sind die beteiligten Baueigenschaften jeweils nur **einem** Profil zugeordnet
  - Falls in einem der Bäume disjunkte Profile in unterschiedlichen Unterzweigen aktiviert werden, können damit **Segmentierungen**
    modelliert werden - an den Knoten in diesen unterschiedlichen Unterzweigen sind unterschiedliche Baueigenschaften 
    (im Vergleich zum jeweils anderen Unterzweig) aktiviert
    ::: info Beispiel
    In einem Zweig des Baustoffbaums wird ein Profil für "Fenster" aktiviert, in einem anderen Zweig ein disjunktes Profil für 
    "Türen"
    :::
---
- **Musterfall 2**
  - An allen Knoten in einem Zweig im Baum wird ein bestimmtes **gemeinsames** Profil mit Baueigenschaften aktiviert
    ::: info Beispiel
    Es wird ein gemeinsames Profil für "Bauteile" definiert und an einem bestimmten Zweig im Baustoffbaum aktiviert, dem Baueigenschaften, die sowohl für Fenster als auch für Türen relevant sind (z.B. geometrische Maße, etc.), zugeordnet werden
    :::
  - Wenn dann in unterschiedlichen Unterzweigen **zusätzlich** passende **disjunkte** Profile zu diesem gemeinsamen Profil aktiviert 
    werden, können so **Spezialisierungen** modelliert werden - an den Knoten in diesen unterschiedlichen Unterzweigen sind sowohl gemeinsame, als auch spezielle Baueigenschaften (für den jeweiligen Unterzweig) aktiviert
---
- **Musterfall 3**
  - Üblicherweise werden bestimmte Profile im **Bauvorhabenbaum** (z.B. "Baueinheit > Standort") nur auf bestimmten oberen Ebenen im Baum aktiviert, und 
    **an den Kindbaueinheiten auf tieferen Ebenen deaktiviert**, weil die Werte der betreffenden Baueigenschaften dort nicht benötigt 
    werden, und somit auch nicht weitervererbt werden müssen (Performance-Gewinn)
  - **Hinweis:** Wenn Werte bestimmter Baueigenschaften doch auf tieferen Ebenen benötigt werden, können diese als **gemeinsame** 
    Baueigenschaften weiteren Profilen, die auf den tieferen Ebenen aktiviert werden, zugeordnet werden (siehe Musterfall 4)
  - Im **Baustoffbaum** werden dagegen üblicherweise bestimmte Profile (z.B. "Baustoff > Estrich")
    **an allen Kindbaustoffen des entsprechenden Unterzweigs aktiviert** (im Beispiel des Unterzweigs mit dem Startknoten "Estrich"), wodurch alle Knoten in dem betreffenden Zweig dieselben
    Eigenschaften haben (insbesondere die Blattknoten, die bestimmten Bauprodukten, im Beispiel Estrich-Bauprodukten, entsprechen)
---
- **Musterfall 4**
  - Eine Baueigenschaft kann auch **mehreren Profilen** zugeordnet werden
  - Wir bezeichnen solche, zwei oder mehr Profilen zugeordnete Baueigenschaften als **gemeinsame** Baueigenschaften der beteiligten 
    Profile
  - Im einfachsten Fall wird dann das eine der zwei beteiligten Profile an einem Elternknoten im Baum aktiviert, das andere an einem
    Kindknoten unter diesem Elternknoten
  - So kann unter 
    Nutzung der **Wertevererbung** erreicht werden, dass Werte einer gemeinsamen Baueigenschaft, die als dem einen beteiligten Profil 
    zugeordnete Baueigenschaft am Elternknoten aktiviert wird,
    an ihre direkten oder indirekten Kindknoten **weitervererbt** werden, wo sie als dem anderen beteiligten Profil zugeordnete 
    Baueigenschaft ebenfalls aktiviert ist
  - Dies kann auch über mehr als zwei Ebenen Ebenen im Baum erfolgen - dies wird als **Kaskadierung** bezeichnet
  - Siehe dazu die Beispiele und Abbildungen in der PowerPoint-Präsentation "BIM.click Conceptual Design"
    ::: info Beispiel 
      Nach diesem Muster werden **niveaubezogene** Baueigenschaften (z.B. "Oberkante Fertigfußboden (OKFB)", etc.) über mehrere Ebenen und entsprechende Profile im Bauvorhabenbaum
      (Standort > Geschoss > Raum > ...) als **gemeinsame** Baueigenschaften definiert, und deren Werte von oben nach unten im
      Bauvorhabenbaum **weitervererbt**, d.h. **kaskadiert**
    :::
---
- **Musterfall 5**
  - Es ist auch möglich, dieselbe, gemeinsame Baueigenschaft mehreren Profilen zuzuordnen, welche im Unterschied zu Musterfall 
    4 am **selben** Knoten im Baum aktiviert werden
  - So kann eine Baueigenschaft in mehr als einem Baueigenschaftsprofilformular (mit Eingabefeldern zum Anzeigen und Bearbeiten 
    der Baueigenschaften eines Profils) angezeigt und sogar **"reaktiv"** editiert werden, wenn dies aus fachlicher Sicht 
    erforderlich ist - **"reaktiv"** heißt, das Änderungen des Werts der Baueigenschaft in einem Profilformular sofort auch im 
    anderen Profilformular wirksam werden
:::

---
<!--------------------------------------------------------------------------------------------------------------------------->
<a id="5.4.5-Modellierung-von-Bauvorhaben-mit-Baueigenschaftsprofilen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-5-Modellierung-von-Bauvorhaben-mit-Baueigenschaftsprofilen"/>

## 5.4.5 Modellierung von Bauvorhaben mit systemseitig vordefinierten Baueigenschaftsprofilen

Im Bauvorhabenbaum können Bauvorhaben mit Hilfe von Baueigenschaftsprofilen modelliert werden. Dafür sind bestimmte **Baueigenschaftsprofile systemseitig vordefiniert** (mit jeweils einem dazu passenden **fachlichen Baueigenschaftsprofilformular).** Für diese ist zusätzlich folgende **Reihenfolge** entsprechend einer Modellierung mit zunehmender Granularität festgelegt:
- Bauvorhaben
- Standort
- Gebäude
- Geschoss
- Raum
- Boden
- Bodenaufbau
- Schicht

Weitere systemseitig vordefinierte Baueigenschaftsprofile und dazu passende fachliche Baueigenschaftsprofilformulare sind in Arbeit oder geplant:
- für Baueinheiten im Bauvorhabenbaum
  - z.B. für Wände, Wandaufbauten, Fassaden, Dächer, Treppen und andere Bauteile
- für Baustoffe im Baustoffbaum
  - z.B. für bestimmte Kategorien von Baustoffen wie Estriche oder Dämmstoffe

Bei der Modellierung von Bauvorhaben im Bauvorhabenbaum können die jeweils passenden, systemseitig vordefinierten Baueigenschaftsprofile mittels 
**Kontextmenüs** (rechte Maustaste auf einem Knoten im Baum) an Baueinheiten im Bauvorhabenbaum **aktiviert** werden. Dabei können sowohl Profile an vorhandenen Baueinheiten aktiviert werden, als auch Kindbaueinheiten unter vorhandenen
Baueinheiten angelegt und dabei Profile an diesen Kindbaueinheiten sofort bei deren Neuanlage aktiviert werden.

![Screenshot-Profil-Aktivieren-per-Kontextmenü](https://bimclickserver.herokuapp.com/screenshots/dokumentation-screenshot-baueigenschafts-profil-aktivieren-per-kontext-menu.png "Baueigenschaftsprofil aktivieren per Kontextmenü")

Außerdem bestimmt das System bei Auswahl einer Baueinheit im Bauvorhabenbaum in Abhängigkeit von den daran aktivierten Profilen das dazu passende fachliche **Baueigenschaftsprofilformular**, wählt dieses aus, und zeigt es an.

Bei der Aktivierung der systemseititig vordefinierten Profile an den Baueinheiten eines Bauvorhabens, das als hierarchische Baumstruktur aus Baueinheiten im Bauvorhabenbaum modelliert wird, stellt das System sicher, dass die obige **Reihenfolge** der beteiligten Profile eingehalten wird. 

Wie systemseitig vordefinierten Profile an hierarchisch angelegten Baueinheiten im Bauvorhabenbaum zur Modellierung von Bauvorhaben benutzt und aktiviert werden können, wird an den folgenden Beispielen erklärt:

::: tip Beispiele für die hierarchische Aktivierung von Baueigenschaftsprofilen an Bauvorhaben
---
- Als flexibelste Form der Modellierung für ein Bauvorhaben bietet sich an, an jeder Baueinheit im Bauvorhaben
**jeweils ein einzelnes passendes Profil zu aktivieren,** unter Einhaltung der oben beschriebenen Reihenfolge der beteiligten 
Profile:
  ::: info Beispiel 1: Modellierung mit Baueinheiten, an denen jeweils einzelne, dedizierte Profile aktiviert sind
  - Wurzelbaueinheit des betreffenden Bauvorhabens
    - Profil "Baueinheit > Bauvorhaben" ist aktiviert
    - Damit repräsentiert diese Baueinheit ein Bauvorhaben
  - Kindbaueinheiten der ersten Unterebene
    - Profil "Baueinheit > Standort" ist aktiviert
    - Damit repräsentieren diese Kindbaueinheiten jeweils einen Standort für das Bauvorhaben, das durch ihre Elternbaueinheit 
      repräsentiert wird 
    - Es können so ggf. mehrere Standorte für das Bauvorhaben modelliert werden
  - Kindbaueinheiten der zweiten Unterebene
    - Profil "Baueinheit > Gebäude" ist aktiviert
    - Damit repräsentieren diese Kindbaueinheiten jeweils ein Gebäude an dem Standort, der durch ihre Elternbaueinheit 
      repräsentiert wird
    - Es können so ggf. mehrere Gebäude für einen Standort modelliert werden
  - Kindbaueinheiten der dritten Unterebene
    - Profil "Baueinheit > Geschoss" ist aktiviert
    - Damit repräsentieren diese Kindbaueinheiten jeweils ein Geschoss in dem Gebäude, das durch ihre Elternbaueinheit 
      repräsentiert wird
    - Es können so ggf. mehrere Geschosse für ein Gebäude modelliert werden
  - usw.
---
- Alternativ können als vereinfachte Form der Modellierung an bestimmten Baueinheiten im Bauvorhaben auch
**mehrere passende Profile aktiviert** werden, ebenfalls unter Einhaltung der oben beschriebenen Reihenfolge der beteiligten Profile:

  ::: info Beispiel 2: Modellierung mit Baueinheiten, an denen mehrere Profile aktiviert sind
    - Wurzelbaueinheit des betreffenden Bauvorhabens
      - Profile "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" sind beide aktiviert
      - Damit repräsentiert diese Baueinheit gleichzeitig ein Bauvorhaben und einen Standort
      - Es können so nicht mehrere Standorte für das Bauvorhaben modelliert werden
    - Kindbaueinheiten der ersten Unterebene
      - Profil "Baueinheit > Gebäude" ist aktiviert
      - Damit repräsentieren diese Kindbaueinheiten jeweils ein Gebäude in dem Bauvorhaben und an dem Standort, der durch ihre 
        Elternbaueinheit gemeinsam repräsentiert wird 
      - Es können so ggf. mehrere Gebäude für das Bauvorhaben und den Standort modelliert werden
    - usw.
---
- Es sind weitere Varianten der Modellierung möglich, solange die oben beschriebene Reihenfolge der beteiligten Profile 
eingehalten wird.

- So können in Modellen auch Baueinheiten zur Strukturierung als sogenannte **"Strukturierungsknoten'** eingefügt werden, an denen
**kein dediziertes Profil aktiviert** wird:

  ::: info Beispiel 3: Modellierung mit Baueinheiten ohne Profilaktivierung zur Strukturierung
    - Wurzelbaueinheit des betreffenden Bauvorhabens
      - Profile "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" sind beide aktiviert
      - Damit repräsentiert diese Baueinheit gleichzeitig ein Bauvorhaben und einen Standort
    - Kindbaueinheiten der ersten Unterebene
      - Kein dediziertes Profil ist aktiviert
      - Dies erlaubt es, mehrere Kindbaueinheiten der nächsten Unterebene strukturell zusammenzufassen
      - So könnten hier bestimmte Gebäude z.B. zu einem "Bauabschnitt 1" zusammengefasst werden, andere zu einem "Bauabschnitt 2"
      - **Hinweis:** Da an den Baueinheiten dieser Ebene keine dedizierten Profile aktiviert sind, sondern nur die
        vom System automatisch implizit aktivierten Profile, die an ihren direkten oder indirekten Kindbaueinheiten aktiviert 
        sind, werden für solche Baueinheiten standardmäßig keine Baueigenschaftsprofilformulare angezeigt
    - Kindbaueinheiten der zweiten Unterebene
      - Profil "Baueinheit > Gebäude" ist aktiviert
      - Damit repräsentieren diese Kindbaueinheiten jeweils ein Gebäude in der durch ihre Elternbaueinheit zusammengefassten
        Unterstruktur (z.B. "Bauabschnitt 1")
    - usw.
      
::: 

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="5.4.6-Anzeige-und-Bearbeitung-von-Baueigenschaftsprofilen-mit-Baueigenschaftsprofilformularen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="5-4-6-Anzeige-und-Bearbeitung-von-Baueigenschaftsprofilen-mit-Baueigenschaftsprofilformularen"/>

## 5.4.6 Anzeige und Bearbeitung von Baueigenschaften in Baueigenschaftsprofilen mit Baueigenschaftsprofilformularen

Die Baueigenschaften, die einem Baueigenschaftsprofil zugeordnet sind, können in sogenannten **`Baueigenschaftsprofilformularen`** durch entsprechende Ausgabe- und Eingabefelder angezeigt und so deren Werte bearbeitet und gespeichert werden.

Hier ein Beispiel für ein fachliches Baueigenschaftsprofilformular für das systemseitig vordefinierte Baueigenschaftsprofil "Baueinheit > Raum", welches aus verschiedenen Unter-Tabs besteht ("Decke/Boden", "Maße", "Luftfeuchte", etc.):

 ![Screenshot-Raum-Profil-Formular](https://bimclickserver.herokuapp.com/screenshots/dokumentation-screenshot-raum-baueigenschafts-profil-formular.png "Fachliches Baueigenschaftsprofilformular für Baueigenschaftsprofil 'Raum'")

Das System unterscheidet `generische Baueigenschaftsprofilformulare` für Administratoren und `fachliche Baueigenschaftsprofilformulare`, die für systemseitig vordefinierte Baueigenschaftsprofile (z.B. "Baueinheit > Bauvorhaben", "Baueinheit > Standort", "Baueinheit > Gebäude", "Baueinheit > Geschoss", "Baueinheit > Raum", etc.) für alle Benutzer zur Verfügung stehen. Diese erlauben die Anzeige und Bearbeitung aus fachlicher Sicht und stellen zusätzliche Funktionen zur Verfügung, wie z.B. den Zugriff auf weitere Informationsquellen und die Ausführung von Berechnungen.

Für die an einer Baueinheit aktivierte Baueigenschaftsprofile sind die jeweils passenden **Baueigenschaftsprofilformulare** im 
Tab **"Bauvorhaben" > "Fachliche Planung"** auswählbar. Falls mehrere Baueigenschaftsprofile an der Baueinheit aktiviert sind,
ermittelt das System das **relevanteste** fachliche Baueigenschaftsprofilformular, wählt dieses standardmäßig aus, und zeigt es an. Dieses **relevanteste** fachliche Baueigenschaftsprofilformular an einer Baueinheit wird dabei folgendermaßen bestimmt:

- Zunächst werden aus der Gesamtmenge der an der Baueinheit aktivierten Baueigenschaftsprofile diejenigen
  aktivierten Profile als **relevant** ermittelt, für die die ausgewählte Baueinheit der **unterste** Knoten im Pfad von der 
  Wurzel bis zu den Blättern im Baum ist, an dem das betreffende Profil aktiviert ist.
- Enthält diese Gesamtmenge nur ein relevantes Profil, wird dieses standardmäßig als das **relevanteste** ausgewählt und angezeigt
- Enthält diese Gesamtmenge mehrere relevante Profile, wird daraus das 
  **relevanteste** Profil mittels der im letzten Abschnitt beschriebenen **Reihenfolge** der systemseitig vordefinierten Baueigenschaftsprofile bestimmt (Profile, die vorne in der Reihenfolge stehen, sind dabei relevanter, als solche, die weiter hinten stehen), und dieses standardmäßig ausgewählt und angezeigt. 
- Alternativ kann auch ein Profilformular für ein anderes aktiviertes Profil in der Tableiste zur Anzeige ausgewählt werden.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="6-Datenaustausch"/>

# 6 Datenaustausch und Auswertungen

- Dieser Abschnitt befindet sich im Aufbau. Wir bitten um etwas Geduld.
- Im Bereich "Datenaustausch":
  - Bereits unterstützt wird der Import und Export von Bauvorhaben/Baueinheiten, Baustoffen, Bauinformationen und Baueigenschaften aus/nach Microsoft 
    Excel (CSV- und XLSX-Format) und aus dem/in das JSON-Format
  - Weiterhin geplant ist ein Austausch von Daten:
    - mit CAD-Software wie z.B. Revit (z.B. zum Import von Geometriedaten, per Excel oder anderen Formaten, wenn sinnvoll auch per IFC) 
    - mit Ausschreibungs-/Vergabe-/Abrechnungs-Software (AVA, z.B. Export von baustoff- und bauteilbezogenen Anforderungen)
    - mit Software zur bauphysikalischen Berechnung (Schallschutz, Wärmeschutz, etc., z.B. den K&F internen Excel-Vorlagen zum Schallschutznachweis)
- Im Bereich "Auswertungen" sind weiterhin geplant:
  - Validierungen und Optimierungen durch Assistenten und Wizards
    - Vollständigkeitsprüfungen von Bauvorhaben
    - Prüfung von Bauvorhaben auf Regelkonformität
    - Vorschläge zur Auswahl von Baustoffen für Baueinheiten/Bauvorhaben
    - Vorschläge zur Auswahl von Baueinheiten aufgrund von Regelwerken (z.B. Dachkonstruktionen)
  - Berichte
    - Bauteilkataloge
    - Planungsgutachten
    - Ausschreibungsunterlagen

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="7-Einstellungen"/>

# 7 Einstellungen

- Dieser Abschnitt befindet sich im Aufbau. Wir bitten um etwas Geduld.
- Hier können benutzerspezifische Einstellungen vorgenommen werden.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="8-Dokumentation"/>

# 8 Dokumentation

- Dieser Abschnitt befindet sich im Aufbau. Wir bitten um etwas Geduld.
- Die Online-Dokumentation kann im Hauptmenü mit dem Tab "Dokumentation" geöffnet werden.
- Das Inhaltsverzeichnis der Online-Dokumentation kann auch durch Anwahl des Icons <i class="material-icons" style="font-size:24px">menu_book</i> links oben geöffnet werden.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="9-Verwaltung"/>

# 9 Verwaltung
<!-- Zusätzliche Sprungmarke - erforderlich wegen Umlaut im Heading!!! -->
<a id="9.1-Ueberblick"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="9-1-Ueberblick"/>

## 9.1 Überblick zu Verwaltung

- Diese Auswahl im Hauptmenü wird nur Benutzern mit Benutzerrolle "Administrator" angeboten

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="9.2-Benutzerkonten"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="9-2-Benutzerkonten"/>

## 9.2 Benutzerkonten

- In diesem Tab werden die **Benutzerkonten** verwaltet
- Ein Benutzerkonto wird dabei durch eine **E-Mail-Adresse** identifiziert
- Jedes Benutzerkonto ist dabei einer bestimmten **Benutzerrolle** zugeordnet

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="9.2.1-Benutzerrollen"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="9-2-1-Benutzerrollen"/>

## 9.2.1 Benutzerrollen

- Es werden drei verschiedene **Benutzerrollen** unterschieden, die unterschiedliche **Benutzerberechtigungen** besitzen:
  - **Mitarbeiter**: Diese sind berechtigt, **Bauprojekte** im Bauuvorhabenbaum anzulegen, **Baueinheiten** in solchen Bauprojekten anzulegen, und solche 
    Baueinheiten zu 
    editieren, die sie selbst angelegt haben bzw. denen sie als **Autor** zugeordnet sind.
    Im Bauvorhabenbaum wird dabei die **Autorenschaft weitervererbt**, d.h. die einer Elternbaueinheit im Bauvorhabenbaum zugeordneten Autoren werden beim Hinzufügen einer Kindbaueinheit unter dieser Elternbaueinheit vom System auch dieser Kindbaueinheit zugeordnet.
    Mitarbeiter können außerdem 
    **Bauinformationen** anlegen und solche Bauinformationen editieren, die sie selbst angelegt haben bzw. denen sie als Autor zugeordnet sind. 
    Mitarbeiter dürfen außerdem andere Mitarbeiter als **Autoren** an Bauinformationen und Baueinheiten auswählen oder abwählen, sofern sie diesen selbst als Autor 
    zugeordnet sind.
    Auf **Baustoffe**, **Baueigenschaften**, **Baueigenschaftsprofile** und **Bauvorlagen** im Bauvorhabenbaum dürfen Mitarbeiter nur **lesend**
    zugreifen, d.h. sie dürfen diese **nicht verändern**. 
  - **Redakteure**: Diese sind zusätzlich berechtigt, alle Baustoffe, Baueigenschaften, Baueigenschaftsprofile, Bauinformationen und Bauvorlagen in Bauvorhaben zu editieren
  - **Administratoren**: Diese sind zu allem berechtigt, insbesondere zur Verwaltung anderer Benutzer
- Dabei gilt das folgende Konzept für **Benutzerberechtigungen**:
  - [Dieser Abschnitt ist noch in Arbeit - siehe internes Design]

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="10-Hilfe"/>

# 10 Hilfe

- Das System bietet eine **Bedienungshilfe** und eine **fachliche Hilfe** an.
- Beide können durch Anwahl des Icons <i class="material-icons" style="font-size:24px">contact_support</i> rechts oben geöffnet werden.
- Diese Funktionen und der zugehörige Dokumentationsabschnitt befinden sich im Aufbau. Wir bitten um etwas Geduld.

---

<!--------------------------------------------------------------------------------------------------------------------------->
<a id="11-Glossar"/>

# 11 Glossar


| Begriff | Erklärung | Zugehöriger Dokumentationsabschnitt | Menüpunkt im Hauptmenü
| ------ | ----------- | ----------------------- | -----------------------
| **`Baueigenschaft`** | **`Baueigenschaften`** sind fachliche Eigenschaften, die in der baulichen Planung definiert und verwendet werden. Sie sind als **Attribute** sowohl an **`Baustoffen`** als auch an **`Baueinheiten`** in Bauvorhaben verfügbar. Es kann sich bei den Baueigenschaften um technische (z.B. bauphysikalische), betriebswirtschaftliche (z.B. abrechnungsrelevante) oder sonstige (z.B. geografische) Attribute handeln. Eine Baueigenschaft weist **typbezogene Angaben** und (falls die Baueigenschaft an einem bestimmten Baustoff oder an einer bestimmten Baueinheit **`aktiviert`** ist) **wertbezogene Angaben** auf. | [Baueigenschaften](/Dokumentation/5-Baueigenschaften) | [Baueigenschaften](/Baueigenschaften)
| **`Wertetyp`**  | Der **`Wertetyp`** ist die wichtigste **typbezogene Angabe** zu einer Baueigenschaft: Jede Baueigenschaft erhält bei ihrer Neuanlage einen eindeutigen **`Wertetyp`**. Dieser Wertetyp bestimmt, welchen **Wert** bzw. welche **Werte** die Baueigenschaft annehmen darf. Mögliche **Ausprägungen** des Wertetyps sind "Kennwert", "Kennwertepaar", "Bezeichnungswert", "Bezeichnungswertepaar", "Datumswert", "Datumswertepaar", "Tageszeitwert", "Tageszeitwertepaar", "Aufzählungswert" und "Wahrheitswert". | [Beispiele für Baueigenschaften mit unterschiedlichen Wertetypen](/Dokumentation/5-2-Beispiele-fuer-Baueigenschaften-mit-unterschiedlichen-Wertetypen) | [Baueigenschaften](/Baueigenschaften)
| **`Aktivierung`** | Die **`Aktivierung`** ist einer der wichtigsten **Aktionen** für eine **`Baueigenschaft`**: Baueigenschaften können bei Bedarf an **`Baustoffen`** bzw. **`Baueinheiten`** **aktiviert** werden. Nach einer solchen Aktivierung an einem Baustoff oder einer Baueinheit kann eine Baueigenschaft (gemäß dem bei Definition für sie festgelegten **`Wertetyp`**) spezifische **Werte** an dem betreffenden Baustoff bzw. an der betreffenden Baueinheit annehmen. Dieselbe Baueigenschaft kann an unterschiedlichen Baustoffen bzw. Baueinheiten, an denen sie aktiviert ist, unterschiedliche Werte annehmen. | [Aktivierung und Wertevererbung von Baueigenschaften](/Dokumentation/5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften) | [Bauvorhaben](/Bauvorhaben) und [Baustoffe](/Baustoffe)
| **`Baueigenschaftsprofil`** | Fachlich zusammengehörige **`Baueigenschaften`** können zu **`Baueigenschaftsprofilen`** zusammengefasst und gemeinsam verwaltet werden. Baueigenschaftsprofile sind Mengen von dem Baueigenschaftsprofil **zugeordneten** Baueigenschaften. Eine bestimmte Baueigenschaft kann dabei beliebig vielen verschiedenen Baueigenschaftsprofilen zugeordnet werden. Umgekehrt können einem bestimmten Baueigenschaftsprofil beliebig viele verschiedene Baueigenschaften zugeordnet werden. Baueigenschaftsprofile können bei Bedarf an **`Baustoffen`** bzw. **`Baueinheiten`** **aktiviert** werden. Dadurch werden alle dem Baueigenschaftsprofil zugeordneten Baueigenschaften gemeinsam an dem betreffenden Baustoff bzw. der betreffenden Baueinheit aktiviert. | [Baueigenschaftsprofile](/Dokumentation/5-4-Baueigenschaftsprofile) | [Baueigenschaften](/Baueigenschaften)
| **`Baueigenschaftsprofilformular`** | Die Baueigenschaften, die einem Baueigenschaftsprofil zugeordnet sind, können in sogenannten **`Baueigenschaftsprofilformularen`** durch entsprechende Ausgabe- und Eingabefelder angezeigt und deren Werte bearbeitet und gespeichert werden. Das System unterscheidet dabei **`generische Baueigenschaftsprofilformulare`** für Administratoren und **`fachliche Baueigenschaftsprofilformulare`**, die für systemseitig vordefinierte Baueigenschaftsprofile (z.B. "Baueinheit > Bauvorhaben", "Baueinheit > Standort", etc.) für alle Benutzer zur Verfügung stehen. Diese erlauben die Anzeige und Bearbeitung aus fachlicher Sicht und stellen zusätzliche Funktionen zur Verfügung, wie z.B. den Zugriff auf weitere Informationsquellen und Berechnungen. | [Baueigenschaftsprofilformulare](/Dokumentation/5-4-5-Anzeige-und-Bearbeitung-von-Baueigenschaftsprofilen-mit-Baueigenschaftsprofilformularen) | [Bauvorhaben](/Bauvorhaben)
| **`Baueinheit`** | Die Teileinheiten von Bauvorhaben werden als **`Baueinheiten`** bezeichnet. Baueinheiten werden im **Bauvorhabenbaum** verwaltet. Der Bauvorhabenbaum kann beliebig viele **`Baueinheiten`** als verschachtelte Strukturen enthalten. Jede Baueinheit kann wiederum aus beliebig vielen, verschachtelten Baueinheiten aufgebaut sein. | [Bauvorhaben](/Dokumentation/2-Bauvorhaben) | [Bauvorhaben](/Bauvorhaben)
| **`Bauvorhaben`** | **`Bauvorhaben`** sind spezielle **`Baueinheiten`**, die zur Darstellung ganzer Bauprojekte im **Bauvorhabenbaum** dienen. Dementsprechend sind Bauvorhaben aus beliebig vielen, verschachtelten **`Baueinheiten`** aufgebaut. Es ist auch möglich, verschiedene Bauvorhaben unter gemeinsamen Elternknoten im Bauvorhabenbaum zu gruppieren, um eine bessere Strukturierung und Ordnung im Bauvorhabenbaum zu erreichen. | [Bauvorhaben](/Dokumentation/2-Bauvorhaben) | [Bauvorhaben](/Bauvorhaben)
| **`Bauteil`** | Als **`Bauteile`** können bestimmte **`Baueinheiten`** (ggf. inklusive ihrer Kindbaueinheiten) bezeichnet werden, an denen spezifische, bauteilbezogene **`Baueigenschaftsprofile`** aktiviert sind, wie z.B. für "Bodenaufbau", "Wandaufbau", "Fenster", "Fassade" oder "Dach". Die Kombination aus der (ggf. verschachtelten) Struktur der Baueinheit und des an ihr aktivierten bauteilspezifischen Baueigenschaftsprofils repräsentiert ein **`Bauteil`** im üblichen Sinn. | [Bauvorhaben](/Dokumentation/2-Bauvorhaben) | [Bauvorhaben](/Bauvorhaben)
| **`Baustoff`** | Die Teileinheiten von Baumaterialien werden als **`Baustoffe`** bezeichnet. Baustoffe werden im **Baustoffbaum** verwaltet. Der Baustoffbaum kann beliebig viele **`Baustoffe`** als verschachtelte Strukturen enthalten. Jeder Baustoff kann wiederum aus beliebig vielen, verschachtelten Baustoffen aufgebaut sein. Um die **Verwendung** von Baustoffen in Baueinheiten zu modellieren, können Baustoffe bei Bedarf **`Baueinheiten`** **zugeordnet** werden. | [Baustoffe](/Dokumentation/3-Baustoffe) | [Baustoffe](/Baustoffe)
| **`Rohstoff`** | **`Rohstoffe`** sind spezielle **`Baustoffe`** , die in anderen Baustoffen als **zugeordnete Rohstoffe** enthalten sein können. Dementsprechend sind Rohstoffe (analog zu Baustoffen) aus beliebig vielen, verschachtelten Rohstoffen aufgebaut. Sie werden in einem entsprechend gekennzeichneten **Rohstoffunterbaum** des Baustoffbaums verwaltet. Um die **Zusammensetzung** von Baustoffen aus Rohstoffen zu modellieren, können Rohstoffe bei Bedarf **`Baustoffen`** **zugeordnet** werden. | [Rohstoffe](/Dokumentation/3-Baustoffe) | [Baustoffe](/Baustoffe)
| **`Bauinformation`** | **`Bauinformationen`** bezeichnen Dokumente, z.B. Normen, Regelwerke, Vorschriften, Richtlinien, Zulassungen, Nachweise, Datenblätter und sonstige Informationen. Sie können interne und externe Links auf Dokumente und Webseiten enthalten. Die Bauinformationen können nach Bedarf beliebigen **`Baustoffen`**, **`Baueinheiten`**, **`Baueigenschaften`** und **`Baueigenschaftsprofilen`** **zugeordnet** werden. | [Bauinformationen](/Dokumentation/4-Bauinformationen) | [Bauinformationen](/Bauinformationen)
| **`Bauinformationsprofil`** | Fachlich zusammengehörige **`Bauinformationen`** können zu **`Bauinformationsprofilen`** zusammengefasst und gemeinsam verwaltet werden. Bauinformationsprofile sind Mengen von dem Bauinformationsprofil **zugeordneten** Bauinformationen. Eine bestimmte Bauinformation kann dabei beliebig vielen verschiedenen Bauinformationsprofilen zugeordnet werden. Umgekehrt können einem bestimmten Bauinformationsprofil beliebig viele verschiedene Bauinformationen zugeordnet werden. Bauinformationsprofile können bei Bedarf an **`Baustoffen`** bzw. **`Baueinheiten`** **aktiviert** werden. Dadurch werden alle dem Bauinformationsprofil zugeordneten Bauinformationen gemeinsam an dem betreffenden Baustoff bzw. der betreffenden Baueinheit aktiviert. | [Bauinformationsprofile](/Dokumentation/4-2-Bauinformationsprofile) | [Bauinformationen](/Bauinformationen)
---

==**[TODO]**== Hier sollten außerdem die in BIM.click verwendeten **Bezeichnungskonventionen** und die dafür festgelegten **hierarchischen Taxonomien** erläutert werden:
- Für Baueigenschaften (z.B. _"Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Baujahr"_)
- Für Baueigenschaftsprofile (z.B. _"Baueinheit > Raum > Nichtwohnen > Büroräume > Einzelbüro"_)
- Für Bauinformationen (z.B. _"Norm > DIN > EN > 13164"_)
- Für Bauinformationsprofile (noch anzulegen)

<!--------------------------------------------------------------------------------------------------------------------------->
<!-- Zusätzliche Sprungmarke - war ursprünglich unbedingt erforderlich wegen Klammern im Heading!!! -->
<a id="12-Markdown"/>

# 12 Markdown

---

<a id="12.1-Test-Links"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="12-1-Test-Links"/>

## 12.1 Test Links

<!-- Test von HTML-Image mit VueAuthImage Directive, im Markdown - funktioniert nicht wegen Verwendung der Vue Directive (erfordert Vue, nicht im Markdown möglich): -->
<!-- <img v-auth-image="'https://bimclickserver.herokuapp.com/img/estrich.jpg'"> -->

==Hier sind Test-Links für Scrolling-Tests definiert:==

Mit normalen DOM-Ids innerhalb des Markdowns als Link Destinations, ohne Verwendung der neuen QMarkdown Anchor Links mit #:

- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu Markdown Destination /Dokumentation/destination1](/Dokumentation/destination1)

- Per HTML a-Tag mit href: <a href="/Dokumentation/destination1" title="/Dokumentation/destination1">Scrolle per HTML-Tag zu Markdown Destination /Dokumentation/destination1</a>

In beiden Fällen passiert mit named Route für Dokumentation folgendes:

- Vue/Quasar reloaded die App mit Page Dokumentation, scrolled dann ordnungsgemäß zur Destination, ==dabei **kein Offset Problem**, aber ursprünglich gab es dabei ein
  **Drawer Problem (mittlerweile gefixed)** - linker Drawer blieb geschlossen!!!==

- Der linke Drawer blieb dabei geschlossen, weil die Komponente Dokumentation in mounted: den openLeftDrawer Event schickt, bevor ihre Parent-Komponente MyLayout
  in mounted: den Listener dafür eingerichtet hat. Dies wird dadurch verursacht, dass die Lifecycle Hook Reihenfolge wie folgt ist: parent.created -> child.created ->
  child.mounted -> parent.mounted! Siehe https://medium.com/@brockreece/vue-parent-and-child-lifecycle-hooks-5d6236bd561f. Als Fix per Empfehlung aus diesem Artikel den Event Listener Setup in MyLayout.vue von mounted: nach created: verschoben.

Mit den neuen Anchor Links in QMarkdown 1.0.11:

- ==Diese **funktionieren nur** wenn man die **named Route** für Dokumentation in routes.js **disabled** - dann funktionieren allerdings die
  Links aus dem Dokumentationsverzeichnis nicht mehr (diese müssten dann umgestellt werden auf Anchor Links, ebenso das Scrolling in mounted:/watch: von Dokumentation, sowie
  etwaige Quasar Buttons mit type="to").==

- ==Sniff Test: **Disabled** man temporär in routes.js die **named Route mit Prop** für die Dokumentation und entfernt entsprechend in MyLayout.vue den Parameter für
  docTopicElementIdToScrollTo am q-route-tab für die Dokumentation, **funktionieren** die unten mit **(X) markierten** Anchor Links!==

- ==Allerdings gibt es dabei ein **Offset-Problem** beim Scrolling: Es wird stets **um einige Zeilen zu weit gescrolled**, was vor einer eventuellen Umstellung gefixed
  werden müsste! Laut Forum-Antwort wird dieser Offset durch den Header über der Seite verursacht.
  **Dieses Offset-Problem tritt nur auf, wenn man #-Anchors, d.h. # in den Links verwendet**. Quasar-Komponenten auf derselben Seite sind nicht ursächlich dafür:
  Testweise q-img und q-carousel am Anfang entfernt, löst das dieses Problem nicht.==

- ==Erwartungsgemäß funktionieren ohne named Route dann die Links aus dem Dokumentationsverzeichnis und Quasar Buttons mit type="to" nicht mehr.==

==**Fazit:**==

- Die Anchor Links von QMarkdown funktionieren nur, wenn man die named Route mit Prop auf normale Route umstellen würde. Dann müsste man aber das Inhaltsverzeichnis
  darauf umstellen, und hätte dann eventuell andere Probleme. Speziell das "Erinnern" an das letzte aus dem Inhaltsverzeichnis angesprochene Sprungziel müsste getestet
  werden.

- Die aktuell ==zuverlässigsten Varianten für Links innerhalb des Markups== mit der named Route mit Prop für die Dokumentation sind also die
  ==beiden Varianten oben **ohne #-Anchors**==. Diese reloaden zwar leider zunächst die App inklusive Dokumentation, scrollen dann aber ohne Offset Problem zur richtigen
  Destination. Das ursprüngliche Drawer Problem dabei ist gefixed.

QMarkdown Anchor Links mit Syntaxfehlern (können ausgeschieden werden):

- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu Anchor innerhalb Markdown: #anchor1](#anchor1) - Error: Reloads app
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu Anchor innerhalb Markdown: /#anchor1](/#anchor1) - Error: Reloads app
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu Anchor innerhalb Markdown: /Dokumentation/#anchor1](/Dokumentation/#anchor1) - Error: 404
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id innerhalb Markdown: #/Dokumentation/destination1](#/Dokumentation/destination1) - Error: Reloads app
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id innerhalb Markdown: #Dokumentation/destination1](#Dokumentation/destination1) - Error: Reloads app
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id innerhalb Markdown: #destination1](#destination1) - Error: Reloads app

Korrekte QMarkdown Anchor Links, funktionieren allerdings alle nicht, wenn Dokumentation als named Route fungiert, sondern nur wenn man diese (siehe oben) als normale Route ohne Prop definiert!!! Die korrekte Syntax dabei ist: =="/Dokumentation#anchor"==.

- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu Anchor innerhalb Markdown: /Dokumentation#anchor1](/Dokumentation#anchor1) - Error: 404 (X - aber Offset Problem)
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id innerhalb Markdown: /Dokumentation#destination1](/Dokumentation#destination1) - Error: 404 (X - aber Offset Problem)
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id innerhalb Markdown: /Dokumentation#4.1-Ueberblick](/Dokumentation#4.1-Ueberblick) - Error: 404 (X - aber Offset Problem)
- Mit internem Markdown Link: [Scrolle per internem Markdown-Link zu div-id außerhalb Markdown: /Dokumentation#11.2-Links](/Dokumentation#13.2-Links) - Error: 404 (X - aber Offset Problem)

Tests mit HTML a-Tag mit #-Anchors statt QMarkdown Anchor Links:

- Per HTML a-Tag mit href: <a href="#anchor1" title="#anchor1">Scrolle per HTML-Tag zu Markdown Anchor Link #anchor1</a> - Error: Reloads app
- Per HTML a-Tag mit href: <a href="/Dokumentation/#anchor1" title="/Dokumentation/#anchor1">Scrolle per HTML-Tag zu Markdown Anchor Link /Dokumentation/#anchor1</a> - Error: 404
- Per HTML a-Tag mit href: <a href="/Dokumentation#anchor1" title="/Dokumentation#anchor1">Scrolle per HTML-Tag zu Markdown Anchor Link /Dokumentation#anchor1</a> - Error: 404 (X - aber Offset Problem)

---

<a id="12.2-Markdown-Cheat-Sheet"/>
<!-- Zusätzliche Sprungmarke für internen Markdown Link - erforderlich wegen Punkt im Heading!!! -->
<!-- ACHTUNG: Sprungmarken, die einen "." in der id enthalten, funktionieren aus dem Inhaltsverzeichnis, aber nicht aus internen Markdown-Links in bim-click-dokumenation.md! -->
<a id="12-2-Markdown-Cheat-Sheet"/>

## 12.2 Markdown Cheat Sheet
### Markdown Cheat Sheet mit allen wichtigen Markdown-Syntaxelementen

- Dieses Cheat Sheet dient als Vorlage für BIM.click-Beschreibungen im Markdown-Format
- Diese Beschreibungen können in der fachlichen Hilfe angezeigt werden
- Beschreibungen können im Unter-Tab "Beschreibung" von "Baueinheiten", "Baustoffen" und "Baueigenschaften" editiert werden
- Vorlage-Syntaxelemente können einfach per Zwischenablage aus dem linken Eingabefenster hier (den gewünschten Teil markieren und in die Zwischenablage kopieren) in das Eingabefenster einer zu erstellenden Beschreibung (Einfügungsstelle markieren und dort aus der Zwischenablage einfügen) übertragen werden
- Quelle: https://www.markdownguide.org/cheat-sheet/

___

**Überschriften**
# H1
## H2
### H3





___
**Schriftstile**
- Fett: **Fetter Text**
- Kursiv:	*Kursiver Text*
- Hervorgehobener Text: Diese Worte sind ==sehr wichtig==.
- Durchgestrichener Text: ~~The world is flat.~~
- Subskript: H~2~O
- Superskript: X^2^



___
**Emojis**
- Beispiel für Emoji-Code: :joy:
- Beispiel für Emjoji-Code :heart:
- Weitere Emoji-Codes hier: https://gist.github.com/rxaviers/7360908



___
**Geordnete Liste**
1. Erstes Element
2. Zweites Element
3. Drittes Element

Hinweis: Die Listen können auch verschachtelt werden per Einrückung!



___
**Ungeordnete Liste**
- Erstes Element
- Zweites Element
- Drittes Element

Hinweis: Die Listen können auch verschachtelt werden per Einrückung!



___
**Aufgabenliste**

- [x] Write the press release
- [ ] Update the website 
- [ ] Contact the media

Hinweis: Die Listen können auch verschachtelt werden per Einrückung!



___
**Horizontale Trennlinie**
___


___
**Links**
- Einfacher Link: https://www.spiegel.de 
- Link mit individueller Linkbezeichnung und Anzeigetext (Tooltip): [SPIEGEL Online](https://www.spiegel.de "Tooltip: Hier klicken, um die Website anzuzeigen")
- Link auf assets-Folder im Frontend: [Estrich](https://bimclick.herokuapp.com/assets/estrich.jpg "Tooltip: Hier klicken, Estrich anzuzeigen")


___
**Hochgeladenes Bild**
- Dafür den Uploader unten im Tab "Beschreibung" benutzen und eine Datei für das Bild hochladen. Den beim Hochladen erzeugten internen Link per Schaltfläche zuerst in die Zwischenablage kopieren. Anschließend mittels rechter Maustaste und "Einfügen" den internen Link an die gewünschte Stelle im Markdown-Eingabefeld kopieren.
- Beispiel: 
  ![Linkbezeichnung](https://bimclickserver.herokuapp.com/img/parkplatz_2020-10-16_11-38-20-988_2022-02-10_10-46-23-313.gif "Linkanzeigetext")



___
**Tabelle**
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |



___
**Token**
- `Begriff`
- Kann für Hervorhebungen von besonderen Begriffen verwendet werden



___
**Code-Block**
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```


___
**Container**
:::
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: info
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

:::info mit Titel
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: tip Tipp
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: warning Warnung
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: danger Achtung
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: danger Verschachtelt
here be **dragons**
with a `token` and a [link](https://quasar.dev)
  ::: warning Warnung
  here be **dragons**
  with a `token` and a [link](https://quasar.dev)
::::::





___
**Fußnote**
==Hinweis:== Die unten benutzten Verlinkungen für Fußnoten werden aktuell nicht unterstützt!

Ich bin ein Satz mit Fußnote. [^1]
[^1]: Das ist die Fußnote
<!--------------------------------------------------------------------------------------------------------------------------->

