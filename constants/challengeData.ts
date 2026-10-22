export type ChallengeMode = 'missing_code' | 'find_error' | 'match_registers';

export type QuestionType = 'multiple_choice' | 'fill_in_blank';

export interface BaseChallengeQuestion {
  id: string;
  unitNumber: number; // 3, 4, 5, 6
  unitTitle: string;
  title: string;
  syllabusRef: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface MissingCodeQuestion extends BaseChallengeQuestion {
  mode: 'missing_code';
  type: QuestionType;
  prompt: string;
  codeSnippet: string; // contains '___' or similar placeholder
  blankLabel?: string;
  options?: string[]; // for multiple_choice
  correctAnswerIndex?: number; // for multiple_choice
  acceptedAnswers?: string[]; // for fill_in_blank (case-insensitive variants)
  hint?: string;
  explanation: string;
}

export interface FindErrorQuestion extends BaseChallengeQuestion {
  mode: 'find_error';
  prompt: string;
  codeLines: string[]; // array of code lines
  faultyLineIndex: number; // 0-indexed line with the bug
  faultyLineNumber: number; // 1-indexed for display
  errorDescription: string;
  options: string[]; // Options for how to fix the error
  correctOptionIndex: number;
  explanation: string;
  correctedSnippet: string;
}

export interface RegisterMatchItem {
  id: string;
  name: string; // e.g., 'TMOD', 'SCON', 'ALE', 'R14 (LR)'
  architecture: '8051' | 'ARM7' | 'AVR / Advanced';
  category: 'Special Function Register' | 'Pin' | 'Register' | 'Peripheral';
  functionDescription: string;
}

export interface MatchRegistersQuestion extends BaseChallengeQuestion {
  mode: 'match_registers';
  prompt: string;
  items: RegisterMatchItem[]; // typically 4 to 6 pairs to match
  explanation: string;
}

// -------------------------------------------------------------
// MODE A: Complete the Missing Code Questions
// -------------------------------------------------------------
export const MISSING_CODE_QUESTIONS: MissingCodeQuestion[] = [
  // Question 1 (Unit 3 - 8051 Assembly - MCQ)
  {
    id: 'mc-a1',
    mode: 'missing_code',
    type: 'multiple_choice',
    unitNumber: 3,
    unitTitle: 'Unit III – 8051 Assembly Language Programming',
    title: 'Indirect RAM Data Loading',
    syllabusRef: 'Topic 3.5: Addressing Modes of 8051',
    difficulty: 'Easy',
    prompt: 'Complete the instruction that loads Accumulator A with the byte located in internal RAM addressed by register R0:',
    codeSnippet: `; Load byte from internal RAM pointed to by R0
MOV R0, #30H      ; Point R0 to internal RAM address 30H
___               ; Load Accumulator via pointer
ADD A, #05H       ; Add constant 5`,
    blankLabel: 'Line 3',
    options: [
      'MOV A, @R0',
      'MOV A, R0',
      'MOV @R0, A',
      'MOVC A, @A+R0',
    ],
    correctAnswerIndex: 0,
    hint: 'In 8051 assembly, the "@" prefix specifies Register Indirect Addressing through R0 or R1.',
    explanation: 'The instruction "MOV A, @R0" uses 8051 Register Indirect Addressing, where R0 holds the address in internal RAM (00H–7FH) from which data is loaded into the Accumulator.',
  },

  // Question 2 (Unit 4 - 8051 Timers - Fill in the blank)
  {
    id: 'mc-a2',
    mode: 'missing_code',
    type: 'fill_in_blank',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'Starting Timer 0 in Software',
    syllabusRef: 'Topic 4.2: 8051 Timer/Counter and Timer Modes',
    difficulty: 'Easy',
    prompt: 'Enter the exact 8051 assembly mnemonic to set the run control bit and start Timer 0:',
    codeSnippet: `MOV TMOD, #01H    ; Configure Timer 0 in 16-bit Mode 1
MOV TL0, #00H     ; Clear low-byte counter
MOV TH0, #0DCH    ; Load high-byte delay constant
___               ; Start Timer 0 (set run bit)
WAIT: JNB TF0, WAIT ; Poll overflow flag`,
    blankLabel: 'Line 4',
    acceptedAnswers: ['SETB TR0', 'SETB TR0;', 'SETB  TR0'],
    hint: 'The Timer Run control bit in the TCON register for Timer 0 is named TR0.',
    explanation: 'The "SETB TR0" instruction sets bit 4 of the TCON register (TR0), which activates Timer 0 counting pulses from the internal clock divider.',
  },

  // Question 3 (Unit 4 - 8051 Serial UART - MCQ)
  {
    id: 'mc-a3',
    mode: 'missing_code',
    type: 'multiple_choice',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'UART Baud Rate Reload Value',
    syllabusRef: 'Topic 4.4: 8051 Serial Port Communication & Modes',
    difficulty: 'Medium',
    prompt: 'Select the correct 8-bit reload value for TH1 to generate a standard 9600 baud rate with an 11.0592 MHz crystal in Mode 2:',
    codeSnippet: `MOV TMOD, #20H    ; Timer 1 in Mode 2 (8-bit auto-reload)
MOV TH1, ___      ; Load reload value for 9600 baud
MOV SCON, #50H    ; 8-bit UART, Receiver Enabled
SETB TR1          ; Start Timer 1 baud clock`,
    blankLabel: 'TH1 operand',
    options: [
      '#0FDH',
      '#0FAH',
      '#0F4H',
      '#0E8H',
    ],
    correctAnswerIndex: 0,
    hint: 'Baud rate formula: TH1 = 256 - (11,059,200 / (384 * 9600)) = 256 - 3 = 253.',
    explanation: 'At 11.0592 MHz, 9600 baud requires TH1 = 256 - 3 = 253 = 0xFD (written as #0FDH in 8051 assembly). On overflow, TH1 reloads TL1 automatically.',
  },

  // Question 4 (Unit 3 - 8051 Assembly - Fill in the blank)
  {
    id: 'mc-a4',
    mode: 'missing_code',
    type: 'fill_in_blank',
    unitNumber: 3,
    unitTitle: 'Unit III – 8051 Assembly Language Programming',
    title: 'Multiply Accumulator by B Register',
    syllabusRef: 'Topic 3.6: Instruction Set of 8051 (Arithmetic)',
    difficulty: 'Easy',
    prompt: 'Type the 8051 instruction to multiply the unsigned 8-bit values in register A and register B:',
    codeSnippet: `MOV A, #05H       ; Load first operand into Accumulator
MOV B, #06H       ; Load second operand into B register
___               ; Multiply A and B (Product in B:A)
; High byte of product in B (00H), low byte in A (1EH = 30)`,
    blankLabel: 'Line 3',
    acceptedAnswers: ['MUL AB', 'MUL  AB', 'MUL AB;'],
    hint: 'The 8051 instruction for multiplication takes operands A and B with no comma between them.',
    explanation: 'The "MUL AB" instruction multiplies the unsigned 8-bit integers in Accumulator (A) and register B. The 16-bit result places the low byte in A and the high byte in B.',
  },

  // Question 5 (Unit 5 - ARM7 Core - MCQ)
  {
    id: 'mc-a5',
    mode: 'missing_code',
    type: 'multiple_choice',
    unitNumber: 5,
    unitTitle: 'Unit V – ARM7 Architecture & Instruction Set',
    title: 'ARM7 Branch with Link Subroutine Call',
    syllabusRef: 'Topic 5.7: ARM7 Instruction Set & Control Flow',
    difficulty: 'Medium',
    prompt: 'Which branch instruction calls a subroutine and automatically copies the return address into the Link Register (R14 / LR)?',
    codeSnippet: `; ARM7 Subroutine Invocation
MOV R0, #100      ; Pass parameter in R0
___ delay_timer   ; Call subroutine and preserve return address in LR
ADD R1, R0, #1    ; Continues execution after subroutine returns`,
    blankLabel: 'Line 3',
    options: [
      'BL',
      'B',
      'BX',
      'CALL',
    ],
    correctAnswerIndex: 0,
    hint: 'ARM uses "Branch with Link" to save the Program Counter into R14 without a hardware stack push.',
    explanation: '"BL" (Branch with Link) copies the address of the next sequential instruction into R14 (Link Register) before branching to the label. Subroutines return using "MOV PC, LR" or "BX LR".',
  },

  // Question 6 (Unit 4 - 8051 Interrupts - Fill in the blank)
  {
    id: 'mc-a6',
    mode: 'missing_code',
    type: 'fill_in_blank',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'Return from Interrupt Service Routine',
    syllabusRef: 'Topic 4.3: 8051 Interrupts, Vector Table & Registers',
    difficulty: 'Medium',
    prompt: 'Enter the specialized 8051 instruction used at the end of an Interrupt Service Routine to restore execution and clear internal interrupt flip-flops:',
    codeSnippet: `ORG 0003H         ; External Interrupt 0 (/INT0) Vector
ISR_INT0:
    CPL P1.0      ; Toggle indicator LED on P1.0
    ___           ; Return from interrupt and restore priority level`,
    blankLabel: 'Line 4',
    acceptedAnswers: ['RETI', 'RETI;', 'RETI '],
    hint: 'Do not use standard RET. An extra letter "I" signifies interrupt return.',
    explanation: 'The "RETI" (Return from Interrupt) instruction pops the high and low bytes of the Program Counter from the stack and clears the internal interrupt-in-service priority flip-flop, allowing lower-priority interrupts to trigger again.',
  },

  // Question 7 (Unit 5 - ARM7 Shifter - MCQ)
  {
    id: 'mc-a7',
    mode: 'missing_code',
    type: 'multiple_choice',
    unitNumber: 5,
    unitTitle: 'Unit V – ARM7 Architecture & Instruction Set',
    title: 'ARM Inline Barrel Shifter Operation',
    syllabusRef: 'Topic 5.2: RISC Design Rules & Inline Barrel Shifter',
    difficulty: 'Hard',
    prompt: 'Complete the single-cycle ARM instruction that computes: R0 = R1 + (R2 * 4):',
    codeSnippet: `; Compute array base address + (index * 4 bytes per word)
; R1 = Base Address, R2 = Index
ADD R0, R1, ___   ; Add R1 and (R2 shifted left by 2 bits)`,
    blankLabel: 'Operand 2',
    options: [
      'R2, LSL #2',
      'R2, LSR #2',
      'R2, ASR #2',
      'R2, ROR #2',
    ],
    correctAnswerIndex: 0,
    hint: 'Multiplying by 4 is equivalent to a Logical Shift Left (LSL) by 2 bits.',
    explanation: 'The ARM inline barrel shifter pre-shifts operand 2 before passing it to the ALU with zero execution time penalty. "ADD R0, R1, R2, LSL #2" shifts R2 left by 2 positions (multiplying by 4) and adds R1.',
  },

  // Question 8 (Unit 4 - 8051 I/O - Fill in the blank)
  {
    id: 'mc-a8',
    mode: 'missing_code',
    type: 'fill_in_blank',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 I/O Ports and Interfacing',
    title: 'Configuring Port 1 for Input Reading',
    syllabusRef: 'Topic 4.1: 8051 I/O Ports and Port Structure',
    difficulty: 'Medium',
    prompt: 'Enter the value that must be written to an 8051 port latch before reading digital inputs from external switches:',
    codeSnippet: `; Configure Port 1 pins as digital inputs
MOV P1, ___       ; Write logic 1s to all 8 bits of port latch
MOV A, P1         ; Safely read logic states on external pins`,
    blankLabel: 'Immediate value',
    acceptedAnswers: ['#0FFH', '#FFH', '#0xFF', '0FFH', '0xFF', '#255'],
    hint: '8051 port pins use quasi-bidirectional buffers; writing 1 turns off the internal pull-down FET.',
    explanation: 'Writing #0FFH (all 1s) to the port latch turns off the internal pull-down FET, allowing external switches or sensor circuits to pull the pins to 0 without contention.',
  },
];

// -------------------------------------------------------------
// MODE B: Find the Programming Error Questions
// -------------------------------------------------------------
export const FIND_ERROR_QUESTIONS: FindErrorQuestion[] = [
  // Question 1 (Unit 3 - Missing # immediate prefix)
  {
    id: 'fe-b1',
    unitNumber: 3,
    unitTitle: 'Unit III – 8051 Assembly Language Programming',
    title: 'Missing Immediate Symbol (#) in Timer Setup',
    syllabusRef: 'Topic 3.5: Addressing Modes & Direct vs Immediate',
    difficulty: 'Easy',
    mode: 'find_error',
    prompt: 'Identify the line containing an addressing mode error that loads TMOD from RAM address 20H instead of configuring Timer 1 in Mode 2:',
    codeLines: [
      'ORG 0000H',
      'MOV TMOD, 20H',
      'MOV TH1, #0FDH',
      'SETB TR1',
      'HERE: SJMP HERE',
    ],
    faultyLineIndex: 1,
    faultyLineNumber: 2,
    errorDescription: 'Line 2 uses Direct Addressing (20H) instead of Immediate Addressing (#20H), reading random data from RAM address 20H.',
    options: [
      'Line 2 should be: MOV TMOD, #20H',
      'Line 3 should be: MOV TH1, 0FDH',
      'Line 4 should be: SETB TR0',
      'Line 1 should be: ORG 2000H',
    ],
    correctOptionIndex: 0,
    explanation: 'Without the "#" prefix, "MOV TMOD, 20H" treats 20H as a direct RAM address in the bit-addressable area. To load the hex constant 20H into TMOD, the immediate prefix "#" is required: "MOV TMOD, #20H".',
    correctedSnippet: `ORG 0000H
MOV TMOD, #20H    ; CORRECTED: Immediate constant #20H
MOV TH1, #0FDH
SETB TR1
HERE: SJMP HERE`,
  },

  // Question 2 (Unit 4 - Inverted Polling Condition)
  {
    id: 'fe-b2',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'Premature Exit in Timer Delay Loop',
    syllabusRef: 'Topic 4.5: Assembly Programs for Timer Delays',
    difficulty: 'Medium',
    mode: 'find_error',
    prompt: 'The following delay routine terminates immediately instead of waiting for Timer 0 to overflow. Find the faulty line:',
    codeLines: [
      'MOV TMOD, #01H',
      'MOV TH0, #0FFH',
      'MOV TL0, #00H',
      'SETB TR0',
      'WAIT: JB TF0, WAIT',
      'CLR TR0',
      'CLR TF0',
    ],
    faultyLineIndex: 4,
    faultyLineNumber: 5,
    errorDescription: 'Line 5 uses "JB TF0, WAIT" (Jump if Bit is Set). Since TF0 starts at 0, the CPU skips the loop immediately without waiting!',
    options: [
      'Line 5 should be: WAIT: JNB TF0, WAIT',
      'Line 4 should be: CLR TR0',
      'Line 6 should be: SETB TR0',
      'Line 1 should be: MOV TMOD, #10H',
    ],
    correctOptionIndex: 0,
    explanation: 'Timer overflow flag TF0 is initially 0 while counting. The code must poll using "JNB TF0, WAIT" (Jump if Not Bit set) so it loops as long as TF0 = 0, and falls through only when the timer overflows to 1.',
    correctedSnippet: `MOV TMOD, #01H
MOV TH0, #0FFH
MOV TL0, #00H
SETB TR0
WAIT: JNB TF0, WAIT ; CORRECTED: Jump if Not Bit set (wait for TF0 = 1)
CLR TR0
CLR TF0`,
  },

  // Question 3 (Unit 4 - Standard RET instead of RETI in ISR)
  {
    id: 'fe-b3',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'Improper Return from Interrupt Service Routine',
    syllabusRef: 'Topic 4.3: 8051 Interrupts and Vector Table',
    difficulty: 'Medium',
    mode: 'find_error',
    prompt: 'After serving External Interrupt 0, the microcontroller fails to service subsequent interrupts. Locate the error:',
    codeLines: [
      'ORG 0003H',
      'ISR_EXT0:',
      '  CPL P2.0',
      '  MOV R0, #10',
      'DELAY: DJNZ R0, DELAY',
      '  RET',
    ],
    faultyLineIndex: 5,
    faultyLineNumber: 6,
    errorDescription: 'Line 6 uses standard subroutine return "RET" instead of "RETI", leaving the 8051 internal interrupt priority logic locked.',
    options: [
      'Line 6 should be: RETI',
      'Line 1 should be: ORG 000BH',
      'Line 3 should be: CLR P2.0',
      'Line 5 should be: SJMP DELAY',
    ],
    correctOptionIndex: 0,
    explanation: 'Using "RET" merely pops the Program Counter from the stack but fails to clear the 8051 internal interrupt execution status flip-flop. Future interrupts of equal or lower priority remain permanently blocked. "RETI" must be used.',
    correctedSnippet: `ORG 0003H
ISR_EXT0:
  CPL P2.0
  MOV R0, #10
DELAY: DJNZ R0, DELAY
  RETI              ; CORRECTED: Restores PC and resets interrupt priority logic`,
  },

  // Question 4 (Unit 5 - Direct Memory Access in RISC ARM)
  {
    id: 'fe-b4',
    unitNumber: 5,
    unitTitle: 'Unit V – ARM7 Architecture & Instruction Set',
    title: 'Violation of ARM Load-Store RISC Rule',
    syllabusRef: 'Topic 5.2: Architectural Inheritance and RISC Design Rules',
    difficulty: 'Hard',
    mode: 'find_error',
    prompt: 'ARM is a strict Load-Store architecture where ALU operations cannot directly access external memory. Identify the illegal instruction:',
    codeLines: [
      'LDR R1, =0x40000000',
      'ADD R0, [R1], R2',
      'STR R0, [R1, #4]',
      'BX LR',
    ],
    faultyLineIndex: 1,
    faultyLineNumber: 2,
    errorDescription: 'Line 2 attempts to perform an ALU addition directly with a memory pointer "[R1]". In ARM, ALU operations only accept registers.',
    options: [
      'Line 2 should be split: LDR R3, [R1] followed by ADD R0, R3, R2',
      'Line 1 should be: MOV R1, #0x40000000',
      'Line 3 should be: STR [R1, #4], R0',
      'Line 4 should be: MOV PC, #0',
    ],
    correctOptionIndex: 0,
    explanation: 'ARM processors adhere to the strict RISC Load-Store model: arithmetic and logical operations operate exclusively on CPU registers (R0–R15). Memory must first be read using LDR into a register, computed, and written back via STR.',
    correctedSnippet: `LDR R1, =0x40000000
LDR R3, [R1]        ; CORRECTED: First load memory content into register R3
ADD R0, R3, R2      ; Perform register-to-register addition
STR R0, [R1, #4]
BX LR`,
  },

  // Question 5 (Unit 3 - 16-Bit Value in 8-Bit Accumulator)
  {
    id: 'fe-b5',
    unitNumber: 3,
    unitTitle: 'Unit III – 8051 Assembly Language Programming',
    title: 'Register Size Mismatch (16-bit to 8-bit)',
    syllabusRef: 'Topic 3.2: 8051 Registers and Pin Configuration',
    difficulty: 'Easy',
    mode: 'find_error',
    prompt: 'The 8051 Accumulator (A) is strictly an 8-bit register. Which line attempts an invalid 16-bit assignment?',
    codeLines: [
      'ORG 0000H',
      'MOV DPTR, #4500H',
      'MOV A, #1234H',
      'MOV R1, #25H',
      'END',
    ],
    faultyLineIndex: 2,
    faultyLineNumber: 3,
    errorDescription: 'Line 3 attempts to load the 16-bit value #1234H into the 8-bit Accumulator A (maximum capacity 00H–FFH).',
    options: [
      'Line 3 should load an 8-bit value (e.g. MOV A, #34H) or use DPTR for 16-bit addresses',
      'Line 2 should be: MOV DPTR, 4500H',
      'Line 4 should be: MOV R1, #1234H',
      'Line 1 should be: ORG 1234H',
    ],
    correctOptionIndex: 0,
    explanation: 'Accumulator A is an 8-bit register that can only store numbers between 00H and FFH (0–255). To hold a 16-bit address or value, the 16-bit Data Pointer (DPTR) or two 8-bit registers (like DPH and DPL) must be used.',
    correctedSnippet: `ORG 0000H
MOV DPTR, #4500H
MOV A, #34H       ; CORRECTED: 8-bit value loaded into 8-bit Accumulator
MOV R1, #25H
END`,
  },

  // Question 6 (Unit 4 - Forgetting to Clear TI Flag in UART Loop)
  {
    id: 'fe-b6',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Timers, Interrupts & Serial Port',
    title: 'Stuck UART Loop Due to Uncleared TI Flag',
    syllabusRef: 'Topic 4.4: 8051 Serial Port Communication',
    difficulty: 'Hard',
    mode: 'find_error',
    prompt: 'In this serial transmission routine, the second character is immediately overwritten or corrupted because a hardware flag is not cleared. Identify the bug:',
    codeLines: [
      'MOV SBUF, #\'A\'',
      'WAIT: JNB TI, WAIT',
      'MOV SBUF, #\'B\'',
      'WAIT2: JNB TI, WAIT2',
      'SJMP $',
    ],
    faultyLineIndex: 1,
    faultyLineNumber: 2,
    errorDescription: 'After transmission completes and TI becomes 1, software must manually execute "CLR TI". Because TI remains 1, WAIT2 passes immediately without waiting for \'B\' to finish transmitting!',
    options: [
      'Between Lines 2 and 3, software must execute: CLR TI',
      'Line 1 should be: MOV SBUF, A',
      'Line 2 should be: WAIT: JB TI, WAIT',
      'Line 4 should be: CLR RI',
    ],
    correctOptionIndex: 0,
    explanation: 'The 8051 UART hardware sets the Transmit Interrupt flag (TI) when character transmission completes, but hardware does NOT clear it automatically. Software MUST clear TI using "CLR TI" before or immediately after sending the next character.',
    correctedSnippet: `MOV SBUF, #'A'
WAIT: JNB TI, WAIT
CLR TI            ; CORRECTED: Must clear TI flag in software!
MOV SBUF, #'B'
WAIT2: JNB TI, WAIT2
CLR TI
SJMP $`,
  },
];

// -------------------------------------------------------------
// MODE C: Match Registers, Pins & Peripherals Questions
// -------------------------------------------------------------
export const MATCH_REGISTERS_QUESTIONS: MatchRegistersQuestion[] = [
  // Round 1 (Unit 4 - 8051 Timers, Serial & Interfacing Registers)
  {
    id: 'mr-c1',
    unitNumber: 4,
    unitTitle: 'Unit IV – 8051 Peripherals & Control Registers',
    title: '8051 Core Control Registers Matching',
    syllabusRef: 'Topics 4.1 - 4.4: Special Function Registers',
    difficulty: 'Medium',
    mode: 'match_registers',
    prompt: 'Match each 8051 Special Function Register (SFR) with its correct architectural function:',
    items: [
      {
        id: 'r1',
        name: 'TMOD',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Configures Timer Mode (0, 1, 2, 3) and selects Timer or Counter operation (C/T bit) for Timer 0 & 1.',
      },
      {
        id: 'r2',
        name: 'TCON',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Holds Timer Run control bits (TR0, TR1) and Timer Overflow flags (TF0, TF1).',
      },
      {
        id: 'r3',
        name: 'SBUF',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Two physically distinct serial registers under one address: writing initiates TX, reading fetches RX.',
      },
      {
        id: 'r4',
        name: 'SCON',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Controls UART framing modes, receiver enable (REN), and serial interrupt flags (TI, RI).',
      },
      {
        id: 'r5',
        name: 'IE (Interrupt Enable)',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Contains global interrupt mask bit EA and individual enable bits for timers, serial, and external pins.',
      },
      {
        id: 'r6',
        name: 'PSW (Program Status Word)',
        architecture: '8051',
        category: 'Special Function Register',
        functionDescription: 'Holds ALU flags (CY, AC, OV, P) and Register Bank selector bits (RS1, RS0).',
      },
    ],
    explanation: 'TMOD sets timer modes; TCON controls run/overflow flags; SBUF buffers UART bytes; SCON manages serial modes; IE governs interrupt masking; PSW stores ALU status flags and selects register banks.',
  },

  // Round 2 (Unit 3 & 4 - 8051 Hardware Pins & Signals)
  {
    id: 'mr-c2',
    unitNumber: 3,
    unitTitle: 'Unit III – 8051 Architecture & Pin Configuration',
    title: '8051 Critical Interface Pins Matching',
    syllabusRef: 'Topic 3.2: Features, Architecture and Pin Configuration of 8051',
    difficulty: 'Easy',
    mode: 'match_registers',
    prompt: 'Match each 8051 interface pin with its hardware role in memory interfacing and control:',
    items: [
      {
        id: 'p1',
        name: 'ALE (Pin 30)',
        architecture: '8051',
        category: 'Pin',
        functionDescription: 'Address Latch Enable: pulses high to demultiplex the lower-byte address AD0-AD7 into an external latch (74LS373).',
      },
      {
        id: 'p2',
        name: '/PSEN (Pin 29)',
        architecture: '8051',
        category: 'Pin',
        functionDescription: 'Program Store Enable: active-low read strobe signal connected to /OE of external program ROM.',
      },
      {
        id: 'p3',
        name: '/EA (Pin 31)',
        architecture: '8051',
        category: 'Pin',
        functionDescription: 'External Access: tied to +5V to execute from internal 4KB ROM, or GND to force execution from external ROM.',
      },
      {
        id: 'p4',
        name: 'RST (Pin 9)',
        architecture: '8051',
        category: 'Pin',
        functionDescription: 'Active-high hardware reset pin; requires logic 1 for at least 2 machine cycles to restart CPU at 0000H.',
      },
      {
        id: 'p5',
        name: 'Port 0 (Pins 32-39)',
        architecture: '8051',
        category: 'Pin',
        functionDescription: 'Open-drain bidirectional port that requires external 10k pull-up resistors when used as general-purpose I/O.',
      },
    ],
    explanation: 'ALE demultiplexes Port 0 bus signals; /PSEN strobes external ROM; /EA selects internal vs external memory; RST reinitializes registers; Port 0 is open-drain.',
  },

  // Round 3 (Unit 5 - ARM7 Registers & Core Concepts)
  {
    id: 'mr-c3',
    unitNumber: 5,
    unitTitle: 'Unit V – ARM7 Architecture & Instruction Set',
    title: 'ARM7 Programmer\'s Model Registers Matching',
    syllabusRef: 'Topic 5.4: ARM7 Programmer\'s Model & Operating Modes',
    difficulty: 'Medium',
    mode: 'match_registers',
    prompt: 'Match each ARM7 core register and concept with its precise function in the 32-bit RISC programmer\'s model:',
    items: [
      {
        id: 'a1',
        name: 'R14 (LR - Link Register)',
        architecture: 'ARM7',
        category: 'Register',
        functionDescription: 'Automatically holds the subroutine return address when a Branch with Link (BL) instruction executes.',
      },
      {
        id: 'a2',
        name: 'R13 (SP - Stack Pointer)',
        architecture: 'ARM7',
        category: 'Register',
        functionDescription: 'Designated by software convention to point to the current top of the active runtime stack.',
      },
      {
        id: 'a3',
        name: 'R15 (PC - Program Counter)',
        architecture: 'ARM7',
        category: 'Register',
        functionDescription: 'Points 8 bytes ahead of current executing instruction due to the 3-stage pipeline (Fetch, Decode, Execute).',
      },
      {
        id: 'a4',
        name: 'CPSR',
        architecture: 'ARM7',
        category: 'Register',
        functionDescription: 'Holds condition flags (N, Z, C, V), interrupt disable bits (I, F), Thumb mode bit (T), and processor mode bits (M0-M4).',
      },
      {
        id: 'a5',
        name: 'SPSR',
        architecture: 'ARM7',
        category: 'Register',
        functionDescription: 'Saves a copy of the CPSR when an exception or interrupt occurs to permit clean restoration upon exit.',
      },
    ],
    explanation: 'LR preserves return addresses; SP tracks the runtime stack; PC leads by 8 bytes due to pipelining; CPSR stores active status/mode flags; SPSR saves CPSR during exception handling.',
  },

  // Round 4 (Unit 6 - Modern Microcontroller Platforms & Peripherals)
  {
    id: 'mr-c4',
    unitNumber: 6,
    unitTitle: 'Unit VI – Study 8 bit microcontroller Applications',
    title: 'Embedded Microcontroller Platforms Matching',
    syllabusRef: 'Topics 6.3 - 6.6: ATmega328, LPC2148, MSP430, and STM32 Features',
    difficulty: 'Medium',
    mode: 'match_registers',
    prompt: 'Match each embedded platform studied in Unit VI with its distinguishing architectural hallmark:',
    items: [
      {
        id: 'm1',
        name: 'ATmega328P (AVR)',
        architecture: 'AVR / Advanced',
        category: 'Peripheral',
        functionDescription: '8-bit AVR RISC core powering Arduino Uno; features 32KB Flash, 2KB SRAM, and 6-channel 10-bit SAR ADC.',
      },
      {
        id: 'm2',
        name: 'LPC2148 (NXP)',
        architecture: 'AVR / Advanced',
        category: 'Peripheral',
        functionDescription: '32-bit ARM7TDMI-S MCU with 512KB Flash, 40KB RAM, dual 10-bit ADCs, a 10-bit DAC, and USB 2.0 device controller.',
      },
      {
        id: 'm3',
        name: 'MSP430 (TI)',
        architecture: 'AVR / Advanced',
        category: 'Peripheral',
        functionDescription: '16-bit ultra-low power RISC MCU with FRAM, multiple sleep modes (consuming < 1 uA), and sub-microsecond wake-up.',
      },
      {
        id: 'm4',
        name: 'STM32 (ST)',
        architecture: 'AVR / Advanced',
        category: 'Peripheral',
        functionDescription: '32-bit ARM Cortex-M microcontroller with low-latency NVIC, advanced motor PWM timers, CAN bus, and USB.',
      },
    ],
    explanation: 'ATmega328P is the Arduino Uno core; LPC2148 provides ARM7 with DAC and USB; MSP430 specializes in ultra-low power; STM32 features ARM Cortex-M with NVIC and motor timers.',
  },
];

// -------------------------------------------------------------
// Helper Utilities for Validation and Shuffling
// -------------------------------------------------------------

/**
 * Normalizes user input for fill-in-the-blank questions:
 * - Trims whitespace
 * - Converts to uppercase
 * - Strips trailing semicolons and extraneous spaces
 */
export function normalizeAnswer(ans: string): string {
  return ans
    .trim()
    .toUpperCase()
    .replace(/;/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Validates a user's typed answer against accepted variants.
 */
export function checkFillInBlank(userInput: string, accepted: string[]): boolean {
  const normUser = normalizeAnswer(userInput);
  if (!normUser) return false;

  return accepted.some((variant) => {
    const normVariant = normalizeAnswer(variant);
    if (normUser === normVariant) return true;

    // Handle hex variations: e.g. #0FDH vs 0FDH vs 0XFD vs #0XFD
    const cleanUserHex = normUser.replace(/^#/, '').replace(/^0X/, '');
    const cleanVariantHex = normVariant.replace(/^#/, '').replace(/^0X/, '');
    return cleanUserHex === cleanVariantHex;
  });
}

/**
 * Durstenfeld shuffle utility for randomizing questions and options.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
