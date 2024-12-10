const API_BASE_URL = '/api/v1';

interface ApiResponse {
  access_token: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: {
      id: number;
      username: string;
      role: 'student' | 'admin';
      name?: string;
    };
    token: string;
  };
  message?: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Attempting to login with:', { email, password });

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    const apiResponse = JSON.parse(responseText) as ApiResponse;
    
    localStorage.setItem('token', apiResponse.access_token);
    console.log('Token stored in localStorage');
    
    const tokenPayload = JSON.parse(atob(apiResponse.access_token.split('.')[1]));
    console.log('Token payload:', tokenPayload);

    return {
      success: true,
      data: {
        user: {
          id: Number(tokenPayload.username),
          username: email,
          role: tokenPayload.role,
          name: email.split('@')[0],
        },
        token: apiResponse.access_token,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    };
  }
}

interface ApiProfileResponse {
  error: boolean;
  message: string;
  data: {
    ho: string;
    ten: string;
    email: string;
    dia_chi: string;
    sdt: string;
    cccd: string;
    ngay_sinh: string;
    khoa: {
      ten_khoa: string;
    };
    ma_nguoi_dung: number;
    he_dao_tao: {
      ten_he_dao_tao: string;
    };
    ma_khoa_sv: string;
    gpa_tichluy: string;
    tinchi_tichluy: number;
    ngay_nhap_hoc: string;
    han_dao_tao_sv: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  studentId: string;
  faculty: string;
  major: string;
  class: string;
  academicYear: string;
  status: string;
  dia_chi?: string;
  sdt?: string;
  cccd?: string;
  ngay_sinh?: string;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return null;
    }

    console.log('Fetching profile with token:', token);

    const response = await fetch(`${API_BASE_URL}/user-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Profile response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw profile response:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status} ${responseText}`);
    }

    const apiResponse = JSON.parse(responseText) as ApiProfileResponse;
    
    const mappedProfile: UserProfile = {
      id: apiResponse.data.ma_nguoi_dung,
      email: apiResponse.data.email,
      name: `${apiResponse.data.ho} ${apiResponse.data.ten}`,
      studentId: apiResponse.data.ma_nguoi_dung.toString(),
      faculty: apiResponse.data.khoa.ten_khoa,
      major: apiResponse.data.he_dao_tao.ten_he_dao_tao,
      class: apiResponse.data.ma_khoa_sv,
      academicYear: `${new Date(apiResponse.data.ngay_nhap_hoc).getFullYear()} - ${new Date(apiResponse.data.han_dao_tao_sv).getFullYear()}`,
      status: `GPA: ${apiResponse.data.gpa_tichluy} - Tín chỉ: ${apiResponse.data.tinchi_tichluy}`,
      dia_chi: apiResponse.data.dia_chi,
      sdt: apiResponse.data.sdt,
      cccd: apiResponse.data.cccd,
      ngay_sinh: apiResponse.data.ngay_sinh,
    };

    console.log('Mapped profile data:', mappedProfile);
    return mappedProfile;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
}

interface ApiRegistrationPeriod {
  ma_dot_dk: string;
  ma_hoc_ky: string;
  ten_dot_dk: string;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
}

interface ApiRegistrationResponse {
  error: boolean;
  message: string;
  data: ApiRegistrationPeriod[];
}

export interface RegistrationPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "ended";
  description: string;
}

function determineStatus(startDate: string, endDate: string): "active" | "upcoming" | "ended" {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return "upcoming";
  } else if (now > end) {
    return "ended";
  } else {
    return "active";
  }
}

export async function getRegistrationPeriods(): Promise<RegistrationPeriod[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Fetching registration periods with token:', token);

    const response = await fetch(`${API_BASE_URL}/subject-registration`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Registration periods response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw registration periods response:', responseText);

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${responseText}`);
    }

    const apiResponse = JSON.parse(responseText) as ApiRegistrationResponse;
    
    if (apiResponse.error) {
      throw new Error(apiResponse.message || 'Không thể tải danh sách đợt đăng ký');
    }

    const mappedPeriods = apiResponse.data.map((period: ApiRegistrationPeriod) => ({
      id: period.ma_dot_dk,
      name: period.ten_dot_dk,
      startDate: period.thoi_gian_bat_dau,
      endDate: period.thoi_gian_ket_thuc,
      status: determineStatus(period.thoi_gian_bat_dau, period.thoi_gian_ket_thuc),
      description: `Học kỳ: ${period.ma_hoc_ky}`,
    }));

    console.log('Mapped registration periods:', mappedPeriods);
    return mappedPeriods;
  } catch (error) {
    console.error('Failed to fetch registration periods:', error);
    throw error instanceof Error ? error : new Error('Không thể kết nối đến server');
  }
}

interface ApiValidationResponse {
  error: boolean;
  message: string;
  valid: boolean;
}

export async function checkRegistrationPeriodValidity(periodId: string, status: "active" | "upcoming" | "ended"): Promise<{
  valid: boolean;
  message: string;
}> {
  
  if (status === "ended") {
    return {
      valid: true,
      message: "success"
    };
  }

  
  if (status === "upcoming") {
    return {
      valid: false,
      message: "Đợt đăng ký này chưa bắt đầu. Vui lòng quay lại sau."
    };
  }

  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/checkvalidtimerange/${periodId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể kiểm tra thời gian đăng ký');
    }

    const data = await response.json() as ApiValidationResponse;
    
    return {
      valid: data.valid,
      message: data.message === "success" 
        ? "Bạn không có quyền đăng ký trong đợt này. Vui lòng kiểm tra lại thời gian đăng ký của bạn."
        : data.message,
    };
  } catch (error) {
    console.error('Validation check error:', error);
    throw error instanceof Error ? error : new Error('Có lỗi xảy ra khi kiểm tra');
  }
}

interface ApiSubjectResponse {
  error: boolean;
  message: string;
  data: {
    ma_mon_hoc: string;
    ten_mon_hoc_VIE: string;
    ten_mon_hoc_ENG: string;
    tin_chi: number;
  }[];
}

export interface Subject {
  code: string;
  nameVN: string;
  nameEN: string;
  credits: number;
}

export async function searchSubject(
  subjectCode: string,
  periodId: string
): Promise<Subject[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Searching for subject:', { subjectCode, periodId });

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/search_subject?ma_mon_hoc=${subjectCode}&ma_dot_dk=${periodId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tìm kiếm môn học');
    }

    const data = await response.json() as ApiSubjectResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tìm kiếm môn học');
    }

    // Map API response to our format
    return data.data.map((subject) => ({
      code: subject.ma_mon_hoc,
      nameVN: subject.ten_mon_hoc_VIE,
      nameEN: subject.ten_mon_hoc_ENG,
      credits: subject.tin_chi,
    }));
  } catch (error) {
    console.error('Subject search error:', error);
    throw error instanceof Error ? error : new Error('Không thể kết nối đến server');
  }
} 

interface ApiRegisteredClass {
  ten_lop_hoc: string;
  ma_mon_hoc: string;
  ma_hoc_ky: string;
}

interface ApiClassDetail {
  ten_lop: string;
  ma_mon: string;
  ma_he_dao_tao: string;
  loai_lop: string;
  si_so_hien_tai: number;
  si_so_min: number;
  si_so_max: number;
  ten_lop_pt: string | null;
  mon_hoc: {
    ten_mon_hoc_VIE: string;
  };
  lich_lop_hoc: any[];
  ten_mon_hoc_VIE: string;
}

interface ApiRegisteredCoursesResponse {
  error: boolean;
  message: string;
  data: {
    totalCredit: {
      tong_tin_chi: number;
    } | null;
    class: ApiRegisteredClass[];
    classDetails: ApiClassDetail[];
  };
}

export interface RegisteredCourse {
  className: string;
  subjectCode: string;
  subjectName: string;
  semester: string;
  currentSize: number;
  maxSize: number;
  schedule: any[];
}

export async function getRegisteredCourses(periodId: string, semesterId: string): Promise<{
  totalCredits: number;
  courses: RegisteredCourse[];
}> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/registered_class?ma_dot_dk=${periodId}&ma_hk=${semesterId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải danh sách môn học đã đăng ký');
    }

    const data = await response.json() as ApiRegisteredCoursesResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải danh sách môn học');
    }

    
    const courses = data.data.classDetails.map((detail) => ({
      className: detail.ten_lop,
      subjectCode: detail.ma_mon,
      subjectName: detail.ten_mon_hoc_VIE,
      semester: data.data.class.find(c => c.ma_mon_hoc === detail.ma_mon)?.ma_hoc_ky || '',
      currentSize: detail.si_so_hien_tai,
      maxSize: detail.si_so_max,
      schedule: detail.lich_lop_hoc,
    }));

    return {
      totalCredits: data.data.totalCredit?.tong_tin_chi || 0,
      courses,
    };
  } catch (error) {
    console.error('Failed to fetch registered courses:', error);
    throw error instanceof Error ? error : new Error('Không thể kết nối đến server');
  }
} 

interface ApiClassResponse {
  error: boolean;
  message: string;
  data: {
    ten_lop: string;
    ma_mon: string;
    ma_hk: string;
  }[];
}

export interface ClassInfo {
  className: string;
  subjectCode: string;
  semester: string;
}

export async function getClassDetails(
  periodId: string,
  semesterId: string,
  subjectCode: string
): Promise<ClassInfo[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/class_details?ma_dot_dk=${periodId}&ma_hk=${semesterId}&ma_mon=${subjectCode}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải danh sách lớp học');
    }

    const data = await response.json() as ApiClassResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải danh sách lớp học');
    }

    return data.data.map((classInfo) => ({
      className: classInfo.ten_lop,
      subjectCode: classInfo.ma_mon,
      semester: classInfo.ma_hk,
    }));
  } catch (error) {
    console.error('Class details error:', error);
    throw error instanceof Error ? error : new Error('Không thể kết nối đến server');
  }
} 

export interface UpdateProfileDTO {
  email: string;
  dia_chi: string;
  sdt: string;
  cccd: string;
  ngay_sinh: string;
}

interface UpdateProfileResponse {
  stattus: string;
  info: {
    ma_nguoi_dung: number;
    ma_khoa: number;
    ho: string;
    ten: string;
    email: string;
    gioi_tinh: string;
    dia_chi: string;
    sdt: string;
    cccd: string;
    ngay_sinh: string;
  };
}

export async function updateProfile(data: UpdateProfileDTO): Promise<UpdateProfileResponse> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Updating profile with data:', data);

    const response = await fetch(`${API_BASE_URL}/user-profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log('Update profile response:', responseText);

    if (!response.ok) {
      throw new Error(responseText || 'Không thể cập nhật thông tin');
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Update profile error:', error);
    throw error instanceof Error ? error : new Error('Không thể kết nối đến server');
  }
} 

interface RegisterClassResponse {
  error: boolean;
  message: string;
}

export async function registerClass(
  classCode: string,
  periodId: string,
  semesterId: string,
  subjectCode: string
): Promise<RegisterClassResponse> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Registering for class:', { classCode, periodId, semesterId, subjectCode });

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/register_class?ma_lop_hoc=${classCode}&ma_dot_dk=${periodId}&ma_hk=${semesterId}&ma_mon=${subjectCode}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const responseText = await response.text();
    console.log('Raw registration response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', e);
      throw new Error('Phản hồi không hợp lệ từ máy chủ');
    }

    console.log('Parsed registration response:', data);

    if (!response.ok || data.error) {
     
      throw new Error(
        data.message === "Error registering student for class"
          ? "Không thể đăng ký lớp học. Vui lòng kiểm tra lại điều kiện đăng ký."
          : data.message || 'Không thể đăng ký lớp học'
      );
    }

    
    if (data.message === "success") {
      return {
        error: false,
        message: "success"
      };
    }

    throw new Error('Không thể đăng ký lớp học');
  } catch (error) {
    console.error('Registration error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface UnregisterClassResponse {
  error: boolean;
  message: string;
}

export async function unregisterClass(
  classCode: string,
  periodId: string,
  semesterId: string,
  subjectCode: string
): Promise<UnregisterClassResponse> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Unregistering from class:', { classCode, periodId, semesterId, subjectCode });

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/unregister_class?ma_lop_hoc=${classCode}&ma_dot_dk=${periodId}&ma_hk=${semesterId}&ma_mon=${subjectCode}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const responseText = await response.text();
    console.log('Raw unregistration response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', e);
      throw new Error('Phản hồi không hợp lệ từ máy chủ');
    }

    console.log('Parsed unregistration response:', data);

    if (!response.ok || data.error) {
      throw new Error(
        data.message === "Error unregistering student from class"
          ? "Không thể hủy đăng ký lớp học. Vui lòng thử lại sau."
          : data.message || 'Không thể hủy đăng ký lớp học'
      );
    }

    
    if (data.message === "success") {
      return {
        error: false,
        message: "success"
      };
    }

    throw new Error('Không thể hủy đăng ký lớp học');
  } catch (error) {
    console.error('Unregistration error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface ApiSemesterGrade {
  MaHK: string;
  GPA_10: string;
  GPA_4: string;
  TinChiHocKy: number;
}

interface ApiSemesterGradesResponse {
  error: boolean;
  message: string;
  data: ApiSemesterGrade[];
}

export interface SemesterGrade {
  semesterId: string;
  gpa10: number;
  gpa4: number;
  credits: number;
}

export async function getSemesterGrades(): Promise<SemesterGrade[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/grade/get_semester_grades`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải điểm học kỳ');
    }

    const data = await response.json() as ApiSemesterGradesResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải điểm học kỳ');
    }

    
    return data.data
      .map((grade) => ({
        semesterId: grade.MaHK,
        gpa10: parseFloat(grade.GPA_10),
        gpa4: parseFloat(grade.GPA_4),
        credits: grade.TinChiHocKy,
      }))
      .sort((a, b) => b.semesterId.localeCompare(a.semesterId)); // Sort newest first
  } catch (error) {
    console.error('Semester grades error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface ApiClassGrade {
  f0: string;  // Tên lớp
  f1: string;  // Mã môn
  f2: string;  // Tên môn
  f3: string;  // Điểm bài tập
  f4: string;  // Điểm bài tập lớn
  f5: string;  // Điểm thí nghiệm
  f6: string;  // Điểm giữa kỳ
  f7: string;  // Điểm cuối kỳ
  f8: string;  // Điểm tổng kết hệ 10
  f9: string;  // Điểm tổng kết hệ 4
  f10: string; // Điểm chữ
}

export interface ClassGrade {
  className: string;
  subjectCode: string;
  subjectName: string;
  homeworkGrade: number;
  projectGrade: number;
  labGrade: number;
  midtermGrade: number;
  finalGrade: number;
  totalGrade10: number;
  totalGrade4: number;
  letterGrade: string;
}

export async function getClassGrades(semesterId: string): Promise<ClassGrade[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/grade/get_class_grades?ma_hk=${semesterId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải điểm môn học');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải điểm môn học');
    }

    return data.data.map((grade: ApiClassGrade) => ({
      className: grade.f0,
      subjectCode: grade.f1,
      subjectName: grade.f2,
      homeworkGrade: parseFloat(grade.f3) || 0,
      projectGrade: parseFloat(grade.f4) || 0,
      labGrade: parseFloat(grade.f5) || 0,
      midtermGrade: parseFloat(grade.f6) || 0,
      finalGrade: parseFloat(grade.f7) || 0,
      totalGrade10: parseFloat(grade.f8) || 0,
      totalGrade4: parseFloat(grade.f9) || 0,
      letterGrade: grade.f10,
    }));
  } catch (error) {
    console.error('Class grades error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface ApiGPAAndCredits {
  f0: string;  // GPA 10
  f1: string;  // GPA 4
  f2: number;  // Tổng tín chỉ
  f3: string;  // Ngày cập nhật
}

interface ApiGPAAndCreditsResponse {
  error: boolean;
  message: string;
  data: ApiGPAAndCredits[];
}

export interface GPAAndCredits {
  gpa10: number;
  gpa4: number;
  totalCredits: number;
  expectedGraduationDate: Date;
}

export async function getGPAAndCredits(): Promise<GPAAndCredits> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/grade/get_gpa_and_credits`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải thông tin GPA');
    }

    const data = await response.json() as ApiGPAAndCreditsResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải thông tin GPA');
    }

    if (!data.data || data.data.length === 0) {
      throw new Error('Không có thông tin GPA');
    }

    const gpaData = data.data[0];
    return {
      gpa10: parseFloat(gpaData.f0) || 0,
      gpa4: parseFloat(gpaData.f1) || 0,
      totalCredits: gpaData.f2,
      expectedGraduationDate: new Date(gpaData.f3),
    };
  } catch (error) {
    console.error('GPA and credits error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface ApiTranscriptGrade {
  f0: string;  // mã
  f1: string;  // tên
  f2: string;  // date
  f3: string;  // he 10
  f4: string;  // he 4
  f5: string;  // diem chu
}

interface ApiTranscriptResponse {
  error: boolean;
  message: string;
  data: ApiTranscriptGrade[];
}

export interface TranscriptGrade {
  subjectCode: string;
  subjectName: string;
  date: Date;
  grade10: number;
  grade4: number;
  letterGrade: string;
}

export async function getTranscript(): Promise<TranscriptGrade[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    const response = await fetch(
      `${API_BASE_URL}/grade/get_transcript`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Không thể tải bảng điểm');
    }

    const data = await response.json() as ApiTranscriptResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tải bảng điểm');
    }

   
    return data.data
      .map((grade) => ({
        subjectCode: grade.f0,
        subjectName: grade.f1,
        date: new Date(grade.f2),
        grade10: parseFloat(grade.f3) || 0,
        grade4: parseFloat(grade.f4) || 0,
        letterGrade: grade.f5,
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort newest first
  } catch (error) {
    console.error('Transcript error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

interface ApiStudent {
  ma_nguoi_dung: number;
  ma_he_dao_tao: string;
  ma_khoa_sv: string;
  gpa_tichluy: number;
  tinchi_tichluy: number;
  ngay_nhap_hoc: string;
  han_dao_tao_sv: string;
  ma_khoa: number;
  ho: string;
  ten: string;
  email: string;
  gioi_tinh: string;
  dia_chi: string;
  sdt: string;
  cccd: string;
  ngay_sinh: string;
}

interface ApiSearchStudentResponse {
  error: boolean;
  message: string;
  data: ApiStudent[];
}

export interface StudentSearchResult {
  id: number;
  name: string;
  studentId: string;
  faculty: string;
  program: string;
  class: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
  idNumber: string;
  birthDate: Date;
  gpa: number;
  credits: number;
  startDate: Date;
  endDate: Date;
}

export async function searchStudents(params: {
  studentId?: string;
  faculty?: string;
}): Promise<StudentSearchResult[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    let url = `${API_BASE_URL}/subject-registration/search_student`;
    if (params.studentId) {
      url += `?ma_nguoi_dung=${params.studentId}`;
    } else if (params.faculty) {
      url += `?khoa=${params.faculty}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Không thể tìm kiếm sinh viên');
    }

    const data = await response.json() as ApiSearchStudentResponse;

    if (data.error) {
      throw new Error(data.message || 'Có lỗi xảy ra khi tìm kiếm sinh viên');
    }

    return data.data.map(student => ({
      id: student.ma_nguoi_dung,
      name: `${student.ho} ${student.ten}`,
      studentId: student.ma_nguoi_dung.toString(),
      faculty: `Khoa ${student.ma_khoa}`,
      program: student.ma_he_dao_tao,
      class: student.ma_khoa_sv,
      email: student.email,
      gender: student.gioi_tinh,
      address: student.dia_chi,
      phone: student.sdt,
      idNumber: student.cccd,
      birthDate: new Date(student.ngay_sinh),
      gpa: student.gpa_tichluy,
      credits: student.tinchi_tichluy,
      startDate: new Date(student.ngay_nhap_hoc),
      endDate: new Date(student.han_dao_tao_sv),
    }));
  } catch (error) {
    console.error('Student search error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 

export interface UpdateStudentDTO {
  ma_nguoi_dung: number;
  ma_gvcn: number;
  ma_he_dao_tao: string;
  ma_khoa_sv: string;
  ma_chuan_av: number;
  ma_chuan_sv: number;
  ma_ctdt: string;
  ngay_ctxh: number;
  email: string;
  gioi_tinh: string;
  dia_chi: string;
  sdt: string;
  cccd: string;
}

interface UpdateStudentResponse {
  error: boolean;
  message: string;
}

export async function updateStudent(data: UpdateStudentDTO): Promise<UpdateStudentResponse> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại');
    }

    console.log('Updating student:', data);

    const response = await fetch(
      `${API_BASE_URL}/subject-registration/update_student`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const responseText = await response.text();
    console.log('Update student response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error('Phản hồi không hợp lệ từ máy chủ');
    }

    if (!response.ok || result.error) {
      // Map specific error messages
      if (result.message === "Error updating student information") {
        throw new Error("Không thể cập nhật thông tin sinh viên. Vui lòng thử lại sau.");
      }
      throw new Error(result.message || 'Có lỗi xảy ra khi cập nhật thông tin sinh viên');
    }

    return result;
  } catch (error) {
    console.error('Update student error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Không thể kết nối đến máy chủ');
  }
} 