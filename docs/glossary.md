---
title: 용어 사전
---

이 페이지는 이 책에서 자주 나오는 용어를 “실무에서 통용되는 의미” 기준으로 짧게 정리한 것이다.  
각 장의 **용어 풀이** 섹션에는 더 자세한 설명이 있을 수 있다.

## AX / 전략
- **AX(AI Transformation)**: AI를 “도구 추가”가 아니라 **업무·조직·거버넌스가 함께 바뀌는 전환**으로 보는 관점.
- **Copilot(보조형)**: 사람의 작업을 돕는 형태(초안 생성/요약/정리).
- **Agentic(에이전트형)**: 목표를 달성하기 위해 여러 단계를 이어서 수행하려는 형태(툴 호출/계획/반복 포함).

## 모델 / 입력·출력
- **LLM(대규모 언어 모델)**: 텍스트를 입력받아 다음 토큰을 예측하는 방식으로 답을 생성하는 모델.
- **토큰(Token)**: 모델이 처리하는 입력·출력의 최소 단위(문자/단어와 1:1 대응이 아님).
- **컨텍스트 윈도우(Context Window)**: 모델이 한 번에 참고할 수 있는 입력 길이(토큰) 범위.
- **시스템 프롬프트(System Prompt)**: 모델의 역할/규칙을 상위에서 고정하는 지시(일반 사용자에게 보이지 않을 수 있음).
- **프롬프트(Prompt)**: 모델에게 주는 요청 문장(목표/근거/제약/출력 형식 포함).
- **온도(Temperature)**: 출력의 다양성/무작위성을 조절하는 파라미터(높을수록 다양하지만 흔들릴 수 있음).

## 검색 / 지식
- **임베딩(Embedding)**: 문장/문서를 숫자 벡터로 표현해 “의미가 가까운 것”을 찾게 하는 방식.
- **벡터 DB(Vector DB)**: 임베딩 벡터를 저장하고 유사도 검색을 수행하는 저장소/엔진.
- **RAG(Retrieval-Augmented Generation)**: 검색으로 관련 문서를 찾고, 그 문서를 근거로 답을 생성하는 구조.

## 운영 / 품질
- **평가(Eval)**: 모델/프롬프트/시스템의 품질을 측정하는 절차(샘플 세트 기반 반복 측정이 핵심).
- **드리프트(Drift)**: 시간 경과나 환경 변화로 성능/출력 특성이 변하는 현상.
- **롤백(Rollback)**: 변경(프롬프트/모델/문서 버전 등)을 이전 상태로 되돌리는 절차.
- **로그(Log) / 감사(Audit)**: 누가/언제/무엇을/왜 바꿨는지 기록하고, 필요 시 검토 가능한 상태로 유지하는 것.
- **SLA(서비스 수준 약속)**: 가동률, 복구시간, 지원 범위 같은 운영 수준의 약속(대외/대내 모두 가능).
- **LLMOps**: LLM 시스템을 배포·평가·모니터링·로그·비용 관점에서 운영하는 방법론/관행.

## 보안 / 리스크
- **PII(개인식별정보)**: 개인을 식별할 수 있는 정보(주민번호, 전화번호 등).
- **프롬프트 인젝션(Prompt Injection)**: 입력에 악성 지시를 섞어 규칙을 우회하거나 정보를 빼내려는 공격.
- **데이터 유출(Data Exfiltration)**: 민감정보가 의도치 않게 외부로 노출/반출되는 사고(모델 출력/로그/연동 경로 포함).
- **레드팀(Red Teaming)**: 실제 공격을 가정해 취약점을 찾는 모의훈련/테스트.

## 표준 / 제도
- **EU AI Act**: EU의 AI 규제 체계(위험 수준 기반). 조직의 AI 리터러시(Article 4) 등 운영 관점 요구사항이 포함됨.
- **NIST AI RMF**: AI 위험 관리를 위한 프레임워크(Govern-Map-Measure-Manage 흐름).
- **ISO/IEC 42001**: 조직 차원의 AI 경영 시스템(AIMS) 표준.
- **ISO/IEC 23894**: AI 리스크 관리 지침.
- **ISO/IEC 42005**: AI 시스템 영향평가(Impact Assessment) 관련 표준.

## 참고/출처
- EU AI Act (Regulation (EU) 2024/1689): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI 600-1 (Generative AI Profile, 2024-07-26): https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- ISO/IEC 42001: https://www.iso.org/standard/42001
- ISO/IEC 23894: https://www.iso.org/standard/77304.html
- ISO/IEC 42005: https://www.iso.org/standard/42005

