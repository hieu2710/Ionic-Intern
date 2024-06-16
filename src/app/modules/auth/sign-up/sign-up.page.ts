import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  emailSignup: any;
  passwordSignup: any;
  confirmPasswordSignup: any;
  myForm: any;
  formCheckSignUp: any;
  signupForm: FormGroup;
  validations: any;
  address: string | undefined;
  email: any;
  password: any;
  username: any;
  token: string | null = null;
  protectedData: any;
  phone: any;
  fullname: string | undefined;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertController: AlertController,
    private router:Router,
    private loadingController: LoadingController
  ) {
    this.validations = {
      email: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'email', message: 'Email chưa đúng định dạng' },
      ],
      username: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'minlength', message: 'Tên người dùng ít nhất 7 ký tự' },
      ],
      phone: [
        { type: 'required', message: 'Phone is required.' },
        { type: 'pattern(/^d{10}$/)', message: 'Số điện thoại phải đủ 10 số' },
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        {
          type: 'minlength',
          message: 'Username must be at least 10 characters long.',
        },
        {
          type: 'pattern',
          message: 'Your password must contain only numbers and letters.',
        },
      ],
      confirmPassword: [{ type: 'required', message: 'Bắt buộc nhập' }],
      fullname: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'minLength', message: 'ID Card phải đủ 12 số' },
      ],
      address: [{ type: 'required', message: 'Bắt buộc nhập' }],
    };
    this.signupForm = this.formBuilder.group({
      email: ['@gmail.com', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(7)]],
      password: ['',  Validators.compose([
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*[@$!%*?&])(?=.*?[a-z])(?=.*?[0-9]).{10,20}$')
      ])],
      confirmPassword: ['', Validators.required],
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', Validators.required]
    }, { 
      validator: this.passwordMatchValidator
     });
  }

  ngOnInit() {
    // this.signupForm;
    
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  async checkEmailUserName(){
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.userService.getUser(this.username, this.email).subscribe(async useLoginName =>{
      console.log(useLoginName)
      if(useLoginName.emailExists || useLoginName.usernameExists) {
        let message = ""
        if(useLoginName.emailExists && useLoginName.usernameExists) {
         message = "Email và Tải khoản của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác. "
        } 
        else if(useLoginName.emailExists) {
          message = "Email của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác. "
        }
        else if(useLoginName.usernameExists) {
          message = "Tài khoản của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác."
        }
        const alert = await this.alertController.create({
          header: 'Đăng ký thất bại',
          message: message,
          buttons: ['Đồng ý'],
        })
        loading.dismiss();
        await alert.present();
        console.log("chưa tạo tài khoản",useLoginName)
      } else {
        loading.dismiss();
        this.getDataToSignUp();
        console.log("đã tạo tài khoản",useLoginName)
      }
    }, error => {
      loading.dismiss();
      console.error('Lỗi khi tìm kiếm người dùng', error);
    })
  }

  async getDataToSignUp() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    const dataSignUp = {
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      name: this.fullname,
    };
    this.userService.postUsers(dataSignUp).subscribe(
      (res: any) => {
        loading.dismiss();
        this.router.navigate(['home'])
        console.log('success', res);
        
      },
      (err: any) => {
        loading.dismiss();
        console.error('failed', err);
      }
    );
  }
}

