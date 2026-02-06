---
title: LLMOps
---

[← 용어 사전](../glossary)

## 한 줄 정의
LLMOps는 LLM 기반 시스템을 **배포·평가·모니터링·로그·비용·정책** 관점에서 운영하는 방법론/관행이다.

## 왜 중요한가(실무)
LLM 시스템의 운영 단위는 “모델”만이 아니다.
- 프롬프트/템플릿
- RAG 문서/인덱스
- 툴 호출 권한/승인 게이트
- 로그/감사

이 조합이 “업무 워크플로우”로 굳어질 때, 조직은 안정적으로 확산할 수 있다.

## 핵심 구성 요소(체크리스트 형태)
### 1) 변경 관리(Change Management)
- 무엇이 바뀌면(모델/프롬프트/문서) 누가 승인하나(RACI)
- 롤백은 가능한가
- 변경 전후 평가(Eval)는 했나

### 2) 평가(Eval)
- 골든 세트가 있는가
- 품질/리스크/비용 지표를 함께 보는가

### 3) 관측성(Observability)
- 오류 유형/민감정보/근거 버전/비용/지연을 추적하는가
- 로그의 보안(권한/보관/마스킹)이 있는가

### 4) 거버넌스(Governance)
- 사용 정책/금지 영역이 있는가
- 대외 문서 승인 게이트가 있는가

## 자주 생기는 오해
- **오해 1: LLMOps = MLOps의 복사**
  - LLMOps는 프롬프트/문서/RAG/툴 호출이 핵심 운영 대상이다.
- **오해 2: 로그만 남기면 된다**
  - 리뷰/개선 루프가 없으면 로그는 비용이다.

## 더 읽기
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI 600-1: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

