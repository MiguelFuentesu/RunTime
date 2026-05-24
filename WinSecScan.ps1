<#
.SYNOPSIS
    Windows Security Scanner v2.0 - EscÃ¡ner de seguridad con cuarentena
.DESCRIPTION
    Escanea procesos, red, persistencia, registro, tareas programadas,
    archivos temporales y estado del antivirus en busca de signos de compromiso.
    OpciÃ³n de poner en cuarentena archivos sospechosos.
.PARAMETER Exportar
    Exporta el informe a un archivo .txt en el escritorio.
.PARAMETER Cuarentena
    Habilita la opciÃ³n de poner en cuarentena archivos sospechosos encontrados en TEMP.
.PARAMETER Silent
    Ejecuta sin pausa al final (Ãºtil para scripting).
.EXAMPLE
    .\WinSecScan.ps1
    .\WinSecScan.ps1 -Cuarentena
    .\WinSecScan.ps1 -Exportar -Cuarentena
.NOTES
    Ejecutar como ADMINISTRADOR para obtener todos los resultados.
#>
param(
    [switch]$Exportar,
    [switch]$Cuarentena,
    [switch]$Silent
)

$Salida = @()
$PuntuacionRiesgo = 0
$TotalAlertas = 0
$TotalAdvertencias = 0
$Inicio = Get-Date
$script:ArchivosEncontrados = @()

$SuspiciousNames = @(
    'mimikatz','psexec','nc','netcat','nmap',
    'wannacry','locky','cryptolocker','backdoor',
    'keylogger','njrat','darkcomet','cybergate',
    'coinminer','xmrig','ethminer','monero'
)

$TareasSistema = @(
    '.NET Framework NGEN v4.0.30319','.NET Framework NGEN v4.0.30319 64',
    '.NET Framework NGEN v4.0.30319 64 Critical','.NET Framework NGEN v4.0.30319 Critical',
    'Pre-staged app cleanup','SyspartRepair','CreateObjectTask','UsbCeip',
    'Data Integrity Scan for Crash Recovery','Driver Recovery on Reboot','Scheduled',
    'UnexpectedCodepath','DirectXDatabaseUpdater','DXGIAdapterCache',
    'Microsoft-Windows-DiskDiagnosticDataCollector','Microsoft-Windows-DiskDiagnosticResolver',
    'Cellular','MdmDiagnosticsCleanup','MapsToastTask',
    'AutomaticOfflineMemoryDiagnostic','ProcessMemoryDiagnosticEvents','RunFullMemoryDiagnostic',
    'WiFiTask','Device Install Group Policy','Device Install Reboot Required',
    'VerifyWinRE','RegIdleBackup','SvcRestartTaskLogon',
    'EnableLicenseAcquisition','LicenseAcquisition','Interactive',
    'MsCtfMonitor','Usb-Notifications','ResolutionHost',
    'BfeOnServiceStartTypeChange','NotificationTask'
)

$ProcesosSinPathPermitidos = @(
    'System','Idle','Registry','Memory Compression','Secure System',
    'Secure System','Secure System','smss','csrss','wininit','winlogon',
    'services','lsass','svchost','fontdrvhost','dwm','conhost'
)

$KnownAppsPuertos = @{
    'lghub_agent' = $true; 'lghub_updater' = $true; 'RazerAppEngine' = $true;
    'RzSDKServer' = $true; 'RzChromaStreamServer' = $true; 'RzChromaConnectServer' = $true;
    'RzDiagnosticService' = $true; 'HapticService' = $true; 'GameManagerService3' = $true;
    'jhi_service' = $true; 'postgres' = $true; 'opencode' = $true; 'Agent' = $true;
    'Battle.net' = $true; 'Discord' = $true; 'Steam' = $true; 'Spotify' = $true;
    'Docker' = $true; 'com.docker' = $true; 'openvpn' = $true; 'brave' = $true;
    'chrome' = $true; 'firefox' = $true; 'msedge' = $true; 'Code' = $true;
    'idea64' = $true; 'pycharm64' = $true; 'webstorm64' = $true; 'redis-server' = $true;
    'nginx' = $true; 'mysqld' = $true; 'sqlservr' = $true; 'mongod' = $true;
}

function ColorLinea($texto, $color) {
    $Salida += $texto
    Write-Host $texto -ForegroundColor $color
}

function Banner {
    Clear-Host
    Write-Host @"

â–ˆâ–ˆâ•—    â–ˆâ–ˆâ•—â–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ•—   â–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•— â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—
â–ˆâ–ˆâ•‘    â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ–ˆâ•—  â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•”â•â•â•â•â•â–ˆâ–ˆâ•”â•â•â•â•â•â–ˆâ–ˆâ•”â•â•â•â•â•â•šâ•â•â•â•â–ˆâ–ˆâ•—
â–ˆâ–ˆâ•‘ â–ˆâ•— â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•”â–ˆâ–ˆâ•— â–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ•‘      â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•
â–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘â•šâ–ˆâ–ˆâ•—â–ˆâ–ˆâ•‘â•šâ•â•â•â•â–ˆâ–ˆâ•‘â•šâ•â•â•â•â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘     â–ˆâ–ˆâ•”â•â•â•â•
â•šâ–ˆâ–ˆâ–ˆâ•”â–ˆâ–ˆâ–ˆâ•”â•â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•‘ â•šâ–ˆâ–ˆâ–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•‘â•šâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—
 â•šâ•â•â•â•šâ•â•â• â•šâ•â•â•šâ•â•  â•šâ•â•â•â•â•šâ•â•â•â•â•â•â•â•šâ•â•â•â•â•â•â• â•šâ•â•â•â•â•â•â•šâ•â•â•â•â•â•â•
          Windows Security Scanner v2.0
"@ -ForegroundColor Cyan
    Write-Host " Equipo: $env:COMPUTERNAME  |  " -NoNewline -ForegroundColor Gray
    Write-Host "Usuario: $env:USERNAME" -ForegroundColor Gray
    Write-Host " Fecha: $(Get-Date -Format 'dddd dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
    $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if (-not $isAdmin) {
        Write-Host " [!] NO ejecutado como Administrador - algunos analisis se saltaran" -ForegroundColor Yellow
    } else {
        Write-Host " [OK] Ejecutado como Administrador" -ForegroundColor Green
    }
    if ($Cuarentena) {
        Write-Host " [Q] Modo cuarentena ACTIVADO - se preguntara antes de aislar archivos" -ForegroundColor Yellow
    }
    Write-Host " Escaneando...`n" -ForegroundColor Gray
}

function Resultado($tipo, $modulo, $mensaje) {
    switch ($tipo) {
        'ALERTA' {
            Write-Host "[!] " -NoNewline -ForegroundColor White -BackgroundColor DarkRed
            Write-Host "[$modulo] " -NoNewline -ForegroundColor Red
            Write-Host $mensaje -ForegroundColor White
            $script:TotalAlertas++
            $script:PuntuacionRiesgo += 3
            $script:Salida += "[!] [$modulo] $mensaje"
        }
        'WARN' {
            Write-Host "[?] " -NoNewline -ForegroundColor Black -BackgroundColor Yellow
            Write-Host "[$modulo] " -NoNewline -ForegroundColor Yellow
            Write-Host $mensaje -ForegroundColor Gray
            $script:TotalAdvertencias++
            $script:PuntuacionRiesgo++
            $script:Salida += "[?] [$modulo] $mensaje"
        }
        'OK' {
            Write-Host "[+] " -NoNewline -ForegroundColor Black -BackgroundColor Green
            Write-Host "[$modulo] " -NoNewline -ForegroundColor Green
            Write-Host $mensaje -ForegroundColor DarkGray
            $script:Salida += "[+] [$modulo] $mensaje"
        }
    }
}

function Get-FirmaDigital($ruta) {
    try {
        $sig = Get-AuthenticodeSignature -FilePath $ruta -ErrorAction Stop
        return $sig.Status -eq 'Valid' -and $sig.SignerCertificate.Subject -match 'Microsoft'
    } catch { return $false }
}

function Get-HashArchivo($ruta) {
    try {
        return (Get-FileHash -Path $ruta -Algorithm SHA256 -ErrorAction Stop).Hash
    } catch { return 'N/A' }
}

function Modulo-Procesos {
    Resultado OK PROCESOS "Analizando procesos activos..."

    $procs = Get-Process -ErrorAction SilentlyContinue

    foreach ($p in $procs) {
        if (-not $p.Path) { continue }

        $name = $p.Name.ToLower()
        $path = $p.Path.ToLower()

        if ($path -match '\\windows\\temp\\|\\appdata\\local\\temp\\|\\users\\\w+\\temp\\') {
            Resultado ALERTA PROCESOS "$($p.Name) (PID:$($p.Id)) corre desde: $($p.Path)"
        }

        if ($SuspiciousNames -contains $name) {
            Resultado ALERTA PROCESOS "Proceso con nombre sospechoso: $($p.Name) (PID:$($p.Id))"
        }

        if ($name -in @('cmd.exe','powershell.exe','wscript.exe','cscript.exe','mshta.exe')) {
            if ($path -notmatch '\\system32\\|\\syswow64\\') {
                Resultado ALERTA PROCESOS "$($p.Name) en ubicacion anormal: $($p.Path)"
            }
        }

        $mb = [math]::Round($p.WorkingSet / 1MB, 1)
        if ($mb -gt 1000) {
            Resultado WARN PROCESOS "$($p.Name) (PID:$($p.Id)) consume $mb MB"
        }
    }

    $total = ($procs | Measure-Object).Count
    $sinPath = ($procs | Where-Object { -not $_.Path -and $_.Name -notin $ProcesosSinPathPermitidos } | Measure-Object).Count
    if ($sinPath -gt 50) {
        Resultado WARN PROCESOS "$sinPath procesos sin ruta visible ($total total)"
    } else {
        Resultado OK PROCESOS "$total procesos activos"
    }
}

function Modulo-Red {
    Resultado OK RED "Analizando conexiones de red..."

    try {
        $tcp = Get-NetTCPConnection -ErrorAction Stop
    } catch {
        Resultado WARN RED "No se pudieron leer conexiones TCP (requiere Admin)"
        return
    }

    $outbound = $tcp | Where-Object { $_.State -eq 'Established' -and $_.RemoteAddress -ne '127.0.0.1' -and $_.RemoteAddress -ne '::1' }
    $listening = $tcp | Where-Object State -eq Listen

    $puertosSospechosos = @(4444, 6667, 6666, 5555, 31337, 12345, 12346, 31337)

    foreach ($conn in $outbound) {
        $procName = (Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue).ProcessName
        if (-not $procName) { $procName = "PID:$($conn.OwningProcess)" }

        if ($puertosSospechosos -contains $conn.RemotePort) {
            Resultado ALERTA RED "$procName -> $($conn.RemoteAddress):$($conn.RemotePort) (puerto anormal)"
        }

        if ($conn.RemotePort -eq 1337 -and -not $KnownAppsPuertos.ContainsKey($procName)) {
            Resultado ALERTA RED "$procName -> $($conn.RemoteAddress):1337 (puerto de backdoor clasico)"
        }
    }

    foreach ($conn in $listening) {
        if ($conn.LocalPort -le 1024 -and $conn.LocalPort -notin @(135,139,445,3389,5040,5353,5355)) { continue }
        $procName = (Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue).ProcessName
        if ($procName -and $procName -notin @('svchost','services','System','lsass','spoolsv','wininit') -and -not $KnownAppsPuertos.ContainsKey($procName)) {
            Resultado WARN RED "$procName escuchando en puerto $($conn.LocalPort)"
        }
    }

    $totalOut = ($outbound | Measure-Object).Count
    $totalListen = ($listening | Measure-Object).Count
    Resultado OK RED "$totalOut conexiones salientes, $totalListen puertos en escucha"
}

function Modulo-Persistencia {
    Resultado OK PERSISTENCIA "Revisando persistencia (inicio automatico)..."

    $runKeys = @(
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce',
        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run',
        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce',
        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run',
        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce'
    )

    $startupFolders = @(
        [Environment]::GetFolderPath('Startup'),
        "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Startup"
    )

    $totalRun = 0
    foreach ($key in $runKeys) {
        if (-not (Test-Path $key)) { continue }
        $items = Get-ItemProperty $key -ErrorAction SilentlyContinue
        if (-not $items) { continue }

        $items.PSObject.Properties | Where-Object Name -notlike 'PS*' | ForEach-Object {
            $totalRun++
            $val = $_.Value
            $signals = @('/c ','-windowstyle hidden','-enc ','-e ','hidden','-w hidden','bypass','-nop','-noprofile')
            $isSuspicious = $false
            foreach ($s in $signals) {
                if ($val -match [regex]::Escape($s)) { $isSuspicious = $true; break }
            }
            if ($isSuspicious) {
                Resultado ALERTA PERSISTENCIA "$($_.Name) -> ejecucion ofuscada en RUN: $val"
            } elseif ($val -match '\\temp\\|\\appdata\\local\\temp\\|\\users\\\w+\\temp\\') {
                Resultado ALERTA PERSISTENCIA "$($_.Name) -> ejecutable desde TEMP: $val"
            }
        }
    }

    if ($totalRun -eq 0) { Resultado OK PERSISTENCIA "Sin entradas en Run keys" }
    else { Resultado OK PERSISTENCIA "$totalRun entradas en Run keys revisadas" }

    foreach ($folder in $startupFolders) {
        if (-not (Test-Path $folder)) { continue }
        $items = Get-ChildItem $folder -File -ErrorAction SilentlyContinue
        foreach ($item in $items) {
            if ($item.Extension -match '\.exe|\.vbs|\.ps1|\.bat|\.cmd|\.js|\.scr|\.jar') {
                $dias = [math]::Round(((Get-Date) - $item.CreationTime).TotalDays)
                $firmado = Get-FirmaDigital $item.FullName
                if ($dias -le 30 -and -not $firmado) {
                    Resultado ALERTA PERSISTENCIA "Nuevo y sin firma en Startup: $($item.Name) (hace ${dias}d)"
                }
            }
        }
    }

    try {
        $services = Get-CimInstance Win32_Service -Filter "StartMode='Auto'" -ErrorAction Stop
        $suspServices = $services | Where-Object { $_.PathName -match 'cmd\.exe|powershell|wscript|cscript|mshta' }
        foreach ($s in $suspServices) {
            Resultado ALERTA PERSISTENCIA "Servicio con shell: $($s.Name) -> $($s.PathName)"
        }
        Resultado OK PERSISTENCIA "$(($services | Measure-Object).Count) servicios auto"
    } catch {
        Resultado WARN PERSISTENCIA "No se pudieron leer servicios (requiere Admin)"
    }

    try {
        $cmdAutoRun = Get-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -ErrorAction SilentlyContinue
        if ($cmdAutoRun -and $cmdAutoRun.AutoRun) {
            Resultado ALERTA PERSISTENCIA "Cmd.exe AutoRun activo en HKCU: $($cmdAutoRun.AutoRun)"
        }
        $cmdAutoRunLM = Get-ItemProperty 'HKLM:\Software\Microsoft\Command Processor' -Name AutoRun -ErrorAction SilentlyContinue
        if ($cmdAutoRunLM -and $cmdAutoRunLM.AutoRun) {
            Resultado ALERTA PERSISTENCIA "Cmd.exe AutoRun activo en HKLM: $($cmdAutoRunLM.AutoRun)"
        }
    } catch { }
}

function Modulo-Tareas {
    Resultado OK TAREAS "Revisando tareas programadas..."

    try {
        $tasks = Get-ScheduledTask -ErrorAction Stop
    } catch {
        Resultado WARN TAREAS "No se pudieron leer tareas (requiere Admin)"
        return
    }

    $totalAlertas = 0
    foreach ($task in $tasks) {
        $actions = $task.Actions
        if (-not $actions) { continue }

        if ($TareasSistema -contains $task.TaskName) { continue }

        $taskPath = ($task.TaskPath).ToLower()
        if ($taskPath -match '\\microsoft\\windows\\') { continue }

        foreach ($action in $actions) {
            $exe = if ($action.Execute) { $action.Execute.ToLower() } else { '' }
            $args = if ($action.Arguments) { $action.Arguments.ToLower() } else { '' }

            if ($exe -match 'cmd\.exe|powershell\.exe|wscript\.exe|cscript\.exe|mshta\.exe') {
                $signals = @('-enc ','-e ','hidden','windowstyle hidden','bypass','-nop','-noprofile')
                foreach ($s in $signals) {
                    if ($args -match [regex]::Escape($s)) {
                        Resultado ALERTA TAREAS "Tarea: $($task.TaskName) -> $exe $args"
                        $totalAlertas++
                        break
                    }
                }
            }

            if ($task.Settings.Hidden -and $exe -and $exe -notmatch '\\system32\\|\\syswow64\\') {
                Resultado ALERTA TAREAS "Tarea OCULTA fuera de System32: $($task.TaskName) -> $exe"
                $totalAlertas++
            }

            if ($exe -match '\\temp\\|\\appdata\\local\\temp\\|\\users\\\w+\\temp\\') {
                Resultado ALERTA TAREAS "Tarea ejecuta desde TEMP: $($task.TaskName) -> $exe"
                $totalAlertas++
            }
        }
    }

    $total = ($tasks | Measure-Object).Count
    if ($totalAlertas -eq 0) {
        Resultado OK TAREAS "$total tareas, sin anomalias"
    }
}

function Modulo-Registro {
    Resultado OK REGISTRO "Revisando registro en busca de anomalias..."

    try {
        $ifeo = Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options' -ErrorAction Stop
        foreach ($sub in $ifeo) {
            $debugger = Get-ItemProperty $sub.PSPath -Name Debugger -ErrorAction SilentlyContinue
            if ($debugger -and $debugger.Debugger) {
                $esValido = $debugger.Debugger -match '\\system32\\|\\syswow64\\' -and (Get-FirmaDigital $debugger.Debugger)
                if (-not $esValido) {
                    Resultado ALERTA REGISTRO "IFEO hijacking en $($sub.PSChildName): Debugger=$($debugger.Debugger)"
                }
            }
        }
    } catch { }

    try {
        $appInit = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows' -Name AppInit_DLLs -ErrorAction SilentlyContinue
        if ($appInit -and $appInit.AppInit_DLLs) {
            Resultado ALERTA REGISTRO "AppInit_DLLs activo: $($appInit.AppInit_DLLs)"
        }
    } catch { }

    try {
        $winlogon = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -Name Userinit -ErrorAction SilentlyContinue
        if ($winlogon -and $winlogon.Userinit -ne 'C:\Windows\system32\userinit.exe,') {
            Resultado ALERTA REGISTRO "Winlogon.Userinit alterado: $($winlogon.Userinit)"
        }
    } catch { }

    try {
        $shellex = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -Name Shell -ErrorAction SilentlyContinue
        if ($shellex -and $shellex.Shell -ne 'explorer.exe') {
            Resultado ALERTA REGISTRO "Winlogon.Shell alterado: $($shellex.Shell)"
        }
    } catch { }

    try {
        $safety = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System' -ErrorAction SilentlyContinue
        if ($safety -and $safety.DisableTaskMgr -eq 1) {
            Resultado ALERTA REGISTRO "Task Manager deshabilitado en registro"
        }
        if ($safety -and $safety.EnableLUA -eq 0) {
            Resultado ALERTA REGISTRO "UAC deshabilitado"
        }
    } catch { }

    try {
        $defPol = Get-ItemProperty 'HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender' -ErrorAction SilentlyContinue
        if ($defPol -and $defPol.DisableAntiSpyware -eq 1) {
            Resultado ALERTA REGISTRO "Windows Defender deshabilitado via directiva"
        }
    } catch { }

    try {
        $notif = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\WindowsDefender' -ErrorAction SilentlyContinue
        if ($notif -and $notif.Enabled -eq 0) {
            Resultado WARN REGISTRO "Notificaciones de Defender deshabilitadas"
        }
    } catch { }

    try {
        $noDefender = Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Services\WinDefend' -Name Start -ErrorAction SilentlyContinue
        if ($noDefender -and $noDefender.Start -ne 2) {
            Resultado ALERTA REGISTRO "Servicio de Defender no arranca automaticamente (Start=$($noDefender.Start))"
        }
    } catch { }

    Resultado OK REGISTRO "Revision de registro completada"
}

function Modulo-TempFiles {
    Resultado OK TEMP "Revisando archivos temporales..."

    $paths = @($env:TEMP, "$env:SystemRoot\Temp")
    $totalSusp = 0

    foreach ($tp in $paths) {
        if (-not (Test-Path $tp)) { continue }
        $archivos = Get-ChildItem $tp -File -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-30) }

        foreach ($f in $archivos) {
            $ext = $f.Extension.ToLower()
            $name = $f.Name.ToLower()
            $firmado = $false

            if ($ext -in @('.exe','.scr','.jar') -or $name -match '\.tmp\.js$|\.tmp\.vbs$|\.tmp\.ps1$|\.tmp\.bat$|\.tmp\.cmd$') {
                $firmado = Get-FirmaDigital $f.FullName
                if (-not $firmado) {
                    $dias = [math]::Round(((Get-Date) - $f.LastWriteTime).TotalDays)
                    Resultado ALERTA TEMP "$($f.Name) (${dias}d, sin firma)"
                    $script:ArchivosEncontrados += $f.FullName
                    $totalSusp++
                }
            } elseif ($ext -eq '.vbs') {
                $dias = [math]::Round(((Get-Date) - $f.LastWriteTime).TotalDays)
                Resultado ALERTA TEMP "$($f.Name) (script VBS en TEMP, ${dias}d)"
                $script:ArchivosEncontrados += $f.FullName
                $totalSusp++
            } elseif ($ext -eq '.ps1') {
                $dias = [math]::Round(((Get-Date) - $f.LastWriteTime).TotalDays)
                Resultado ALERTA TEMP "$($f.Name) (PowerShell script en TEMP, ${dias}d)"
                $script:ArchivosEncontrados += $f.FullName
                $totalSusp++
            } elseif ($ext -in @('.dll') -and -not $firmado -and $f.Length -gt 0) {
                $dias = [math]::Round(((Get-Date) - $f.LastWriteTime).TotalDays)
                $firmado = Get-FirmaDigital $f.FullName
                if (-not $firmado) {
                    Resultado WARN TEMP "$($f.Name) (DLL sin firma en TEMP, ${dias}d)"
                    $script:ArchivosEncontrados += $f.FullName
                    $totalSusp++
                }
            } elseif ($ext -in @('.bat','.cmd') -and -not $firmado) {
                $dias = [math]::Round(((Get-Date) - $f.LastWriteTime).TotalDays)
                Resultado WARN TEMP "$($f.Name) (script BAT en TEMP, ${dias}d)"
                $script:ArchivosEncontrados += $f.FullName
                $totalSusp++
            }
        }
    }

    if ($totalSusp -eq 0) {
        Resultado OK TEMP "No se encontraron archivos sospechosos en temporales"
    }
}

function Modulo-Hosts {
    Resultado OK HOSTS "Revisando archivo hosts y DNS..."

    $hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
    if (Test-Path $hostsPath) {
        $lines = Get-Content $hostsPath -ErrorAction SilentlyContinue |
            Where-Object { $_ -notmatch '^\s*#' -and $_ -notmatch '^\s*$' -and $_ -notmatch 'localhost' -and $_ -notmatch 'docker\.internal' }
        foreach ($line in $lines) {
            if ($line -match '\b(google|facebook|microsoft|windowsupdate|defender|malwarebytes|avast|kaspersky|bitdefender|mcafee|norton|eset|virustotal)\b') {
                Resultado ALERTA HOSTS "Posible bloqueo de seguridad: $line"
            } else {
                Resultado WARN HOSTS "Redireccion en hosts: $line"
            }
        }
    }

    try {
        $dns = Get-DnsClientServerAddress -AddressFamily IPv4 -ErrorAction Stop |
            Where-Object { $_.ServerAddresses -and $_.InterfaceAlias -notmatch 'Loopback|Bluetooth|Virtual|Hyper-V|vEthernet|Software' }
        foreach ($dnsEntry in $dns) {
            $srvAddrs = $dnsEntry.ServerAddresses -join ', '
            if ($srvAddrs -match '^(8\.8|1\.1|9\.9)') {
                Resultado WARN HOSTS "$($dnsEntry.InterfaceAlias) usa DNS publico: $srvAddrs"
            }
        }
    } catch {
        Resultado WARN HOSTS "No se pudo leer DNS (requiere Admin)"
    }

    Resultado OK HOSTS "Revision de hosts/DNS completada"
}

function Modulo-Defender {
    Resultado OK DEFENDER "Verificando Windows Defender..."

    try {
        $mp = Get-MpComputerStatus -ErrorAction Stop
        if (-not $mp.RealTimeProtectionEnabled) {
            Resultado ALERTA DEFENDER "Proteccion en tiempo real DESACTIVADA"
        } else {
            Resultado OK DEFENDER "Proteccion en tiempo real ACTIVA"
        }
        if ($mp.AntivirusEnabled) {
            $dias = [math]::Round(((Get-Date) - $mp.AntivirusSignatureLastUpdated).TotalDays)
            if ($dias -gt 7) {
                Resultado WARN DEFENDER "Firmas desactualizadas (ultima: hace $dias dias)"
            } else {
                Resultado OK DEFENDER "Firmas actualizadas (hace $dias dias)"
            }
        }
        if (-not $mp.AntivirusEnabled) {
            Resultado ALERTA DEFENDER "Windows Defender deshabilitado como antivirus principal"
        }
        if (-not $mp.NISEnabled) {
            Resultado WARN DEFENDER "Proteccion de red (NIS) desactivada"
        }
        if ($mp.AMServiceEnabled -eq $false) {
            Resultado ALERTA DEFENDER "Servicio de antimalware (AM) deshabilitado"
        }
        $ultimoScan = if ($mp.QuickScanAge) { $mp.QuickScanAge } else { 999 }
        if ($ultimoScan -gt 14) {
            Resultado WARN DEFENDER "Sin escaneo rapido reciente (ultimo: hace $ultimoScan dias)"
        }
    } catch {
        Resultado WARN DEFENDER "No se pudo consultar Defender (requiere Admin o no disponible)"
    }
}

function Modulo-WMI {
    Resultado OK WMI "Revisando persistencia via WMI..."

    try {
        $filters = Get-CimInstance -Namespace root\subscription -ClassName __EventFilter -ErrorAction Stop
        $consumers = Get-CimInstance -Namespace root\subscription -ClassName __EventConsumer -ErrorAction SilentlyContinue

        $suspFilters = $filters | Where-Object { $_.Name -ne 'SCM Event Log Filter' }
        $suspConsumers = $consumers | Where-Object { $_.Name -ne 'SCM Event Log Consumer' }

        if ($suspFilters) {
            Resultado ALERTA WMI "Se encontraron $($suspFilters.Count) filtros WMI anormales"
            foreach ($f in $suspFilters) { Resultado WARN WMI "Filtro: $($f.Name) -> $($f.Query)" }
        }
        if ($suspConsumers) {
            Resultado ALERTA WMI "Se encontraron $($suspConsumers.Count) consumidores WMI anormales"
            foreach ($c in $suspConsumers) {
                if ($c.CimClass.CimClassName -match 'CommandLine') {
                    Resultado ALERTA WMI "Consumidor CommandLine: $($c.CommandLineTemplate)"
                }
            }
        }
        if (-not $suspFilters -and -not $suspConsumers) {
            Resultado OK WMI "Sin persistencia WMI anormal detectada"
        }
    } catch {
        Resultado OK WMI "No se pudo leer WMI (requiere Admin o no soportado)"
    }
}

function Modulo-Cuarentena {
    if (-not $Cuarentena -or $script:ArchivosEncontrados.Count -eq 0) { return }

    Write-Host "`n" + "-" * 50 -ForegroundColor DarkGray
    Write-Host "[Q] MODO CUARENTENA ACTIVO" -ForegroundColor White -BackgroundColor DarkYellow
    Write-Host "[Q] Archivos sospechosos detectados: $($script:ArchivosEncontrados.Count)" -ForegroundColor Yellow

    $qDir = Join-Path $PSScriptRoot "Cuarentena_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    $qDir = New-Item -ItemType Directory -Path $qDir -Force | Select-Object -ExpandProperty FullName

    $restoreScript = @"
# Restaurar archivos en cuarentena
# Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

    $manifest = @()

    foreach ($file in $script:ArchivosEncontrados) {
        if (-not (Test-Path $file)) { continue }

        $fileName = Split-Path $file -Leaf
        $hash = Get-HashArchivo $file
        $item = Get-Item $file
        $sizeKB = [math]::Round($item.Length / 1KB, 1)

        Write-Host "`n [Q] Archivo: $fileName" -ForegroundColor White
        Write-Host "     Ruta: $file" -ForegroundColor Gray
        Write-Host "     Tamano: ${sizeKB}KB | Ultimo cambio: $($item.LastWriteTime)" -ForegroundColor Gray
        Write-Host "     SHA256: $hash" -ForegroundColor Gray

        $choice = & {
            Write-Host " [Q] Poner en cuarentena? (S/N/V=Ver contenido): " -NoNewline -ForegroundColor Yellow
            $input = Read-Host
            $input
        }

        if ($choice -eq 'V' -or $choice -eq 'v') {
            try {
                $content = Get-Content $file -Raw -ErrorAction Stop
                Write-Host "`n--- CONTENIDO ---" -ForegroundColor Cyan
                Write-Host $content.Substring(0, [Math]::Min(2000, $content.Length)) -ForegroundColor Gray
                if ($content.Length -gt 2000) { Write-Host "... [truncado]" -ForegroundColor Gray }
                Write-Host "--- FIN ---" -ForegroundColor Cyan
                Write-Host " [Q] Poner en cuarentena? (S/N): " -NoNewline -ForegroundColor Yellow
                $input2 = Read-Host
                if ($input2 -ne 'S' -and $input2 -ne 's') { continue }
            } catch {
                Write-Host " [Q] No se pudo leer el contenido" -ForegroundColor Red
                continue
            }
        } elseif ($choice -ne 'S' -and $choice -ne 's') {
            continue
        }

        $qFileName = "$fileName.cuarentena"
        $qPath = Join-Path $qDir $qFileName
        $destPath = Join-Path $qDir $fileName

        try {
            Copy-Item -Path $file -Destination $destPath -Force -ErrorAction Stop
            Remove-Item -Path $file -Force -ErrorAction Stop

            Write-Host " [Q] ARCHIVO EN CUARENTENA: $qDir\$qFileName" -ForegroundColor White -BackgroundColor DarkRed

            $manifest += @{
                File = $fileName
                OriginalPath = $file
                QuarantinePath = $qPath
                Hash = $hash
                SizeKB = $sizeKB
                LastModified = $item.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss')
                DateQuarantined = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
                Reason = "Detectado por WinSecScan en TEMP como sospechoso"
            }

            $restoreScript += @"
`n# $fileName
#   Origen: $file
Move-Item -Path '$qPath' -Destination '$file' -Force
"@
        } catch {
            Write-Host " [Q] Error al poner en cuarentena: $_" -ForegroundColor Red
        }
    }

    if ($manifest.Count -gt 0) {
        $manifestPath = Join-Path $qDir "manifest.json"
        $manifest | ConvertTo-Json | Out-File $manifestPath -Encoding UTF8
        Write-Host "`n Manifest: $manifestPath" -ForegroundColor Cyan

        $restorePath = Join-Path $qDir "restaurar.ps1"
        $restoreScript | Out-File $restorePath -Encoding UTF8
        Write-Host " Script de restauracion: $restorePath" -ForegroundColor Cyan

        Resultado ALERTA CUARENTENA "$($manifest.Count) archivos en cuarentena en: $qDir"
    } else {
        Write-Host "`n [Q] Ningun archivo fue puesto en cuarentena" -ForegroundColor Gray
        Remove-Item -Path $qDir -Force -Recurse -ErrorAction SilentlyContinue
    }
}

function MostrarResumen {
    $tiempo = [math]::Round(((Get-Date)-$Inicio).TotalSeconds, 1)
    $nivel = if ($PuntuacionRiesgo -ge 20) { "CRITICO" } elseif ($PuntuacionRiesgo -ge 10) { "ALTO" } elseif ($PuntuacionRiesgo -ge 4) { "MEDIO" } else { "BAJO" }

    Write-Host "`n" -NoNewline
    Write-Host "=" * 60 -ForegroundColor DarkGray
    Write-Host " RESUMEN DE SEGURIDAD" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host "=" * 60 -ForegroundColor DarkGray
    Write-Host " Equipo       : $env:COMPUTERNAME" -ForegroundColor White
    Write-Host " Usuario      : $env:USERNAME" -ForegroundColor White
    Write-Host " Duracion     : ${tiempo}s" -ForegroundColor White
    Write-Host "-" * 60 -ForegroundColor DarkGray
    Write-Host " Alertas      : $TotalAlertas" -ForegroundColor Red
    Write-Host " Advertencias : $TotalAdvertencias" -ForegroundColor Yellow
    Write-Host " Puntuacion   : $PuntuacionRiesgo" -ForegroundColor $(if ($PuntuacionRiesgo -ge 10) { 'Red' } elseif ($PuntuacionRiesgo -ge 4) { 'Yellow' } else { 'Green' })
    Write-Host " Nivel        : $nivel" -ForegroundColor $(if ($nivel -eq 'CRITICO') { 'White' } else { $(if ($nivel -eq 'ALTO') { 'Yellow' } else { 'Green' }) }) -BackgroundColor $(if ($nivel -eq 'CRITICO') { 'DarkRed' } elseif ($nivel -eq 'ALTO') { 'DarkYellow' } else { 'DarkGreen' })
    Write-Host "-" * 60 -ForegroundColor DarkGray
    Write-Host " RECOMENDACION:" -ForegroundColor Yellow
    switch ($nivel) {
        'CRITICO' {
            Write-Host "  Ejecuta un antivirus completo (Malwarebytes, Defender) YA." -ForegroundColor Red
            Write-Host "  Revisa manualmente todas las alertas en ROJO." -ForegroundColor Red
        }
        'ALTO' {
            Write-Host "  Revisa las alertas marcadas. Podria haber infeccion activa." -ForegroundColor Yellow
        }
        'MEDIO' {
            Write-Host "  Algunos indicadores sospechosos. Monitorea el equipo." -ForegroundColor Yellow
        }
        'BAJO' {
            Write-Host "  Sin signos evidentes de compromiso. Manten el antivirus activo." -ForegroundColor Green
        }
    }
    Write-Host "=" * 60 -ForegroundColor DarkGray

    if ($Exportar) {
        $ReportFile = "$env:USERPROFILE\Desktop\informe_seguridad_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"
        $Salida | Out-File -FilePath $ReportFile -Encoding UTF8
        Write-Host "`n Informe exportado a:" -NoNewline -ForegroundColor Cyan
        Write-Host " $ReportFile" -ForegroundColor White
    }

    if (-not $Silent) {
        Write-Host "`n Presiona ENTER para salir..." -ForegroundColor Gray
        $null = Read-Host
    }
}

Banner

Modulo-Procesos
Modulo-Red
Modulo-Persistencia
Modulo-Tareas
Modulo-Registro
Modulo-TempFiles
Modulo-Hosts
Modulo-Defender
Modulo-WMI
Modulo-Cuarentena

MostrarResumen


