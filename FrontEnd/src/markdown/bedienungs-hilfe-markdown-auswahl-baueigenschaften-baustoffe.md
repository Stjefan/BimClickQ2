::: tip Hinweise zu Baueigenschaften

<!-- Hinweis: Für Font Color per CSS ist class=accent in MyLayout.vue definiert! -->

- Die Angaben in den linken beiden Spalten beziehen sich auf den **Typ** der Baueigenschaft und sind im gesamten System gültig
- Die Angaben in den rechten beiden Spalten beziehen sich auf die **Werte**, die die Baueigenschaft (gemäß ihrem bei Neuanlage festlegten **Wertetyp)** annehmen kann
- Dazu muss sie für einen Baustoff (bzw. eine Baueinheit) <font class="accent"> **aktiviert** </font> werden (siehe dazu die Hinweise zur Bedienung)
- Diese Werte der Baueigenschaft sind <u>spezifisch</u> für den im Baustoffbaum ausgewählten <u>Baustoff</u> (bzw. für eine im Bauvorhabenbaum ausgewählte <u>Baueinheit)</u>
  :::

::: tip Hinweise zur Bedienung

- In der rechten Spalte "Aktivierungsmerkmale der Baueigenschaft..." die Radio-Knöpfe <font class="accent">**"Aktiviert"** </font> bzw. **"Deaktiviert"** verwenden, um eine Baueigenschaft an dem im Baustoffbaum ausgewählten Baustoff zu **aktivieren** bzw. zu **deaktivieren.**.
  <!-- Link Tests: -->
  <!-- Folgender QMarkdown Link, der innerhalb der Dokumentation funktionniert, wirft seltsame Fehler -->
  <!-- "refused to load the font/image because it violates the content security policy" -->
  <!-- - Siehe [Hilfe per Q-Markdown Link](Hilfe/2.3-Aktivierung-und-Wertevererbung-von-Baueigenschaften). -->
  <!-- Dito der äquivalente Link per HTML a-Tag: -->
  <!-- - <a href="/Hilfe/2.3-Aktivierung-und-Wertevererbung-von-Baueigenschaften" title ="Hilfe per a-Tag">Hilfe per a-Tag</a> -->
  <!-- Links in Bedienungshilfe z.B. in die Dokumentation sollten daher einstweilen mit Quasar to: Buttons erfolgen!!! -->
- Für aktivierte Baueigenschaften können **Werte** in der Unterspalte "Wertbezogene Angaben..." eingegeben oder geändert werden
- Die **Aktivierung** einer Baueigenschaft erfolgt stets am **ausgewählten Baustoff** im Baustoffbaum sowie an allen direkten und indirekten **Elternbaustoffen** im **Pfad** vom ausgewählten Baustoff bis zum Wurzelbaustoff
- Die **Deaktivierung** einer Baueigenschaft erfolgt stets am **ausgewählten Baustoff** im Baustoffbaum sowie an allen direkten und indirekten **Kindbaustoffen** im **Unterbaum** des ausgewählten Baustoffs
  :::
