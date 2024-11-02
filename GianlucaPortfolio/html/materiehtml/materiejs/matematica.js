
RGBA(`
#define detail .00001
#define t time*.1
vec3 lightdir = normalize(vec3(0.5,-0.4,-1.));
float det = 0.0;


vec4 formula (vec4 p) {
     if (abs(p.x)>1.)
        return p;
    float z = fract(sin(floor(p.z)))/10.;
    float z1 = z + fract(cos(floor(p.z*2.)))/10.;
    p.z = fract(p.z);

    for (int i=0; i<6; i++) {
		p.xyz = abs(p.xyz) - vec3(.0, z, .0);
		p = p*1.8/clamp(dot(p.xyz,p.xyz), z1, 1.1-z1) 
            - vec4( 0.5, 2.4+z/3., 0.5, 0.0);
	}
	return p;
}

float texture2 (vec3 p) {
    if (abs(p.x)>0.99)
        return 0.;
    float z = p.z/2.;
    p=formula(vec4(p,0.)).xyz;
    return cos(z)*0.5+clamp(pow(max(0.,max(abs(p.x),abs(p.z))),1.6),.0,1.);
}

vec2 de(vec3 pos) {
    if (abs(pos.x)>1.)
        return vec2(0.,0.);
    vec4 p = vec4(pos, 1.);
    p = formula(p);
	float fr=length(p.zx)/p.w-.002;
    return vec2(fr,0.);
}

vec3 normal(vec3 p) {
	vec3 e = vec3(0.0,det,0.0);
	return normalize(vec3(
			de(p+e.yxx).x-de(p-e.yxx).x,
			de(p+e.xyx).x-de(p-e.xyx).x,
			de(p+e.xxy).x-de(p-e.xxy).x)
    );	
}

vec3 light(in vec3 p, in vec3 dir, in vec3 n, in float hid) {
	float diff = max(0.,dot(lightdir,-n));
	vec3 amb = max(.6,dot(dir,-n))*.7*vec3(1.);
	float k=texture2(p); 
	vec3 col=mix(vec3(k,k*k,k*k*k)*.8+.2, vec3(k)*.5, sin(p.z)*0.5+0.5);
	return col*(amb+diff);
}

vec3 raymarch(in vec3 from, in vec3 dir) {
	float totdist;
	vec2 d = vec2(1e5,0.);
	vec3 p, col;
    for (int i=0; i<99; i++) {
		if (d.x>det && totdist<16.0) {
			p=from+totdist*dir;
			d=de(p);
			det=detail*(1.+totdist*60.);
			totdist+=max(detail,d.x); 
		}
	}
    p=from+dir*(totdist-detail);
    if (d.x<.01) {
        vec3 norm=normal(p);
		col=light(p-abs(d.x-det)*dir, dir, norm, d.y); 
	} 
	return col; 
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy*2.-1.;
	uv.y *= resolution.y/resolution.x;
    vec3 eye = vec3(0., -1.62 , -t*4.);
	vec3 dir = normalize(vec3(gl_FragCoord.xy - resolution.xy*.5, -resolution.y));
	vec3 color=raymarch(eye,dir); 
    gl_FragColor = vec4(color, 1.);
}`)

